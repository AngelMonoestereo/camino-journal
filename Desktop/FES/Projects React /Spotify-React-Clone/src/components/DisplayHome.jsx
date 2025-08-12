import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SongItem from "./SongItem";
import { vpcGenres } from "../constants/vpcGenres";
import { searchTracks, getTopCharts } from "../api/shazam";

const Section = ({ title, desc, items, loading }) => (
  <section className="mt-8">
    <div className="flex items-end justify-between">
      <div>
        <h2 className="font-heading text-goldenHoney text-2xl">{title}</h2>
        {desc && <p className="font-subheading text-oliveBronze">{desc}</p>}
      </div>
    </div>

    <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
      {loading
        ? Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="min-w-[180px] p-3 rounded border border-charcoalBlack/40 bg-deepEspresso/40 animate-pulse h-[230px]" />
          ))
        : items.length
        ? items.map((s, idx) => (
            <SongItem
              key={`${title}-${s.id}-${idx}`}
              id={s.id}
              name={s.name}
              desc={s.artist}
              image={s.image}
            />
          ))
        : <p className="text-sm text-oliveBronze">No results.</p>}
    </div>
  </section>
);

const DisplayHome = () => {
  const [packs, setPacks] = useState({});
  const [loading, setLoading] = useState({});

  useEffect(() => {
    let mounted = true;
    (async () => {
      const initialLoading = {};
      vpcGenres.forEach((g) => (initialLoading[g.id] = true));
      if (mounted) setLoading(initialLoading);

      const entries = await Promise.all(
        vpcGenres.map(async (g) => {
          const term =
            g.id === "lounge" ? "lounge music" :
            g.id === "jazz" ? "jazz" :
            g.id === "blues" ? "blues" :
            g.id === "salsa" ? "salsa classic" :
            g.id === "firepit" ? "acoustic campfire" :
            g.id === "coffeehouse" ? "coffeehouse acoustic" :
            g.title;

            console.log("[DisplayHome] fetching term:", term);

          try {
            let items = await searchTracks(term, 6);
            if (!items.length) {
              console.warn(`[${g.id}] empty search, fallback to top charts`);
              items = await getTopCharts(6);
            }
            return [g.id, items];
          } catch (e) {
            console.warn(`[${g.id}] search failed, fallback to top charts`, e);
            const fallback = await getTopCharts(6);
            return [g.id, fallback];
          }
        })
      );

      if (!mounted) return;

      const next = {};
      entries.forEach(([id, items]) => (next[id] = items));
      console.log("[DisplayHome] packs:", next);
      setPacks(next);

      const done = {};
      vpcGenres.forEach((g) => (done[g.id] = false));
      setLoading(done);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-full">
      <Navbar />

      <div className="mt-6 rounded-xl p-6 bg-deepEspresso/60 border border-charcoalBlack/40">
        <h1 className="font-heading text-3xl text-goldenHoney">Bohemian Vibes</h1>
        <p className="font-subheading text-oliveBronze">
          Drop the Needle, Pour the Drink — curated sets for late nights & warm rooms.
        </p>
      </div>

      <div className="pb-12">
        {vpcGenres.map((g) => (
          <Section
            key={g.id}
            title={g.title}
            desc={g.desc}
            items={packs[g.id] || []}
            loading={loading[g.id]}
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayHome;
