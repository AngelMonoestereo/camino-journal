console.log("index.js loaded");

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const recordList = document.getElementById("recordList");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query === "") return;

  try {
    const response = await fetch(`https://api.discogs.com/database/search?q=${encodeURIComponent(query)}&per_page=6&type=release`, {
      headers: {
        "User-Agent": "VinylPourClub/1.0",
        "Authorization": "Discogs token=yAZudpjLFanXUUfvmNvwrCIaqJeKudNrWrPEIywh"
      }
    });

    const data = await response.json();
    displayRecords(data.results);
  } catch (error) {
    console.error("Error fetching records:", error);
    recordList.innerHTML = "<p>Something went wrong. Please try again later.</p>";
  }
});

function displayRecords(records) {
  recordList.innerHTML = "";
  if (!records.length) {
    recordList.innerHTML = "<p>No records found.</p>";
    return;
  }

  records.forEach((record) => {
    const card = document.createElement("div");
    card.className = "record-card";

    card.innerHTML = `
      <a href="record.html?id=${record.id}">
        <img src="${record.cover_image}" alt="${record.title}" width="100%" />
        <h3>${record.title}</h3>
        <p>${record.year || 'Unknown year'}</p>
      </a>
    `;

    recordList.appendChild(card);
  });
}
