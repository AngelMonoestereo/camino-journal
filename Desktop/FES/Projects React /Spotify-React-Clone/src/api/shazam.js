// src/api/shazam.js

const BASE_URL = "https://shazam-core7.p.rapidapi.com";
const KEY = import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY;

console.log("[shazam] KEY present?", Boolean(KEY));

const headers = {
  "X-RapidAPI-Key": KEY || "",
  "X-RapidAPI-Host": "shazam-core7.p.rapidapi.com",
};

async function getJSON(path) {
  try {
    const res = await fetch(`${BASE_URL}${path}`, { headers });
    const text = await res.text(); // leemos como texto para poder loguear aunque falle

    if (!res.ok) {
      console.error("[shazam] HTTP", res.status, path, text);
      return null; // devolvemos null para que el caller haga fallback
    }

    try {
      const json = JSON.parse(text);
      return json;
    } catch (e) {
      console.error("[shazam] JSON parse error:", e, "raw:", text);
      return null;
    }
  } catch (err) {
    console.error("[shazam] Network error:", err);
    return null;
  }
}

const pickImage = (t) =>
  t?.images?.coverarthq ||
  t?.images?.coverart ||
  t?.images?.background ||
  t?.hub?.image ||
  t?.share?.image ||
  "";

export async function searchTracks(term, limit = 6) {
  console.log("[searchTracks] term:", term);

  const data = await getJSON(
    `/v1/search/multi?search_type=SONGS_ARTISTS&query=${encodeURIComponent(term)}`
  );

  console.log("[searchTracks] raw:", data);

  if (!data) return []; // evita crash

  const hits = data?.tracks?.hits?.map((h) => h.track).filter(Boolean) || [];

  const items = hits.slice(0, limit).map((t, i) => ({
    id: t?.key ?? `${term}-${i}`,
    name: t?.title ?? "Unknown",
    artist: t?.subtitle ?? "",
    image: pickImage(t),
    url: t?.url ?? "",
  }));

  console.log("[searchTracks] normalized:", items);
  return items;
}

export async function getTopCharts(limit = 6) {
  const data = await getJSON(`/v1/charts/world`);
  console.log("[getTopCharts] raw:", data);

  if (!data) return []; // evita crash

  const list = (data?.tracks || []).slice(0, limit).map((t, i) => ({
    id: t?.key ?? `top-${i}`,
    name: t?.title ?? "Unknown",
    artist: t?.subtitle ?? "",
    image: pickImage(t),
    url: t?.url ?? "",
  }));

  console.log("[getTopCharts] normalized:", list);
  return list;
}
