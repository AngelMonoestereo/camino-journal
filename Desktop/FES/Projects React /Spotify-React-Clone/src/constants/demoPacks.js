// src/constants/demoPacks.js

const buildPack = (label, urls) =>
  urls.map((url, i) => ({
    id: i,
    name: `${label} ${i + 1}`,
    desc: label,
    image: url,
  }));

  export const demoPacks = {
  lounge: [
    { id: 0, name: "Lounge 1", desc: "Lounge", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4" },
    { id: 1, name: "Lounge 2", desc: "Lounge", image: "https://images.unsplash.com/photo-1525382455947-f319bc05f9b9" },
    { id: 2, name: "Lounge 3", desc: "Lounge", image: "https://images.unsplash.com/photo-1488992783491-8e04f4b1a2ed" },
    { id: 3, name: "Lounge 4", desc: "Lounge", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb" },
    { id: 4, name: "Lounge 5", desc: "Lounge", image: "https://images.unsplash.com/photo-1542327897-37fa1ff59b4f" },
    { id: 5, name: "Lounge 6", desc: "Lounge", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d" },
  ],
  jazz: [
    { id: 0, name: "Jazz 1", desc: "Jazz", image: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2" },
    { id: 1, name: "Jazz 2", desc: "Jazz", image: "https://images.unsplash.com/photo-1518972559570-7cc1309f3229" },
    { id: 2, name: "Jazz 3", desc: "Jazz", image: "https://images.unsplash.com/photo-1581574203466-c3bff1a87fa1" },
    { id: 3, name: "Jazz 4", desc: "Jazz", image: "https://images.unsplash.com/photo-1505672678657-cc7037095e2c" },
    { id: 4, name: "Jazz 5", desc: "Jazz", image: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae" },
    { id: 5, name: "Jazz 6", desc: "Jazz", image: "https://images.unsplash.com/photo-1504805572947-34fad45aed93" },
  ],
  blues: [
    { id: 0, name: "Blues 1", desc: "Blues", image: "https://images.unsplash.com/photo-1505685296765-3a2736de412f" },
    { id: 1, name: "Blues 2", desc: "Blues", image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3" },
    { id: 2, name: "Blues 3", desc: "Blues", image: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2" },
    { id: 3, name: "Blues 4", desc: "Blues", image: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae" },
    { id: 4, name: "Blues 5", desc: "Blues", image: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29" },
    { id: 5, name: "Blues 6", desc: "Blues", image: "https://images.unsplash.com/photo-1444824775686-4185f172c44b" },
  ],
  salsa: [
    { id: 0, name: "Salsa 1", desc: "Salsa", image: "https://images.unsplash.com/photo-1555601568-c9e6f328489b" },
    { id: 1, name: "Salsa 2", desc: "Salsa", image: "https://images.unsplash.com/photo-1603217208787-d8e6fdbba7ec" },
    { id: 2, name: "Salsa 3", desc: "Salsa", image: "https://images.unsplash.com/photo-1549924231-f129b911e442" },
    { id: 3, name: "Salsa 4", desc: "Salsa", image: "https://images.unsplash.com/photo-1549910139-97a324b64f04" },
    { id: 4, name: "Salsa 5", desc: "Salsa", image: "https://images.unsplash.com/photo-1615553120425-6b8f6f3a73f0" },
    { id: 5, name: "Salsa 6", desc: "Salsa", image: "https://images.unsplash.com/photo-1593697820900-3f57a27e0a2e" },
  ],
  firepit: [
    { id: 0, name: "Firepit 1", desc: "Firepit", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26" },
    { id: 1, name: "Firepit 2", desc: "Firepit", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d" },
    { id: 2, name: "Firepit 3", desc: "Firepit", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb" },
    { id: 3, name: "Firepit 4", desc: "Firepit", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
    { id: 4, name: "Firepit 5", desc: "Firepit", image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7" },
    { id: 5, name: "Firepit 6", desc: "Firepit", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" },
  ],
  coffeehouse: [
    { id: 0, name: "Coffeehouse 1", desc: "Coffeehouse", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" },
    { id: 1, name: "Coffeehouse 2", desc: "Coffeehouse", image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df" },
    { id: 2, name: "Coffeehouse 3", desc: "Coffeehouse", image: "https://images.unsplash.com/photo-1511920170033-f8396924c348" },
    { id: 3, name: "Coffeehouse 4", desc: "Coffeehouse", image: "https://images.unsplash.com/photo-1517705008128-361805f42e86" },
    { id: 4, name: "Coffeehouse 5", desc: "Coffeehouse", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" },
    { id: 5, name: "Coffeehouse 6", desc: "Coffeehouse", image: "https://images.unsplash.com/photo-1521747116042-5a810fda9664" },
  ],
};


// export const demoPacks = {
//   lounge: buildPack("Lounge", [
//     "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4", // ejemplo lounge bar
//     "https://images.unsplash.com/photo-1525382455947-f319bc05f9b9",
//     "https://images.unsplash.com/photo-1488992783491-8e04f4b1a2ed",
//     "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
//     "https://images.unsplash.com/photo-1542327897-37fa1ff59b4f",
//     "https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
//   ]),
//   jazz: buildPack("Jazz", [
//     "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2", // sax
//     "https://images.unsplash.com/photo-1518972559570-7cc1309f3229", // piano
//     "https://images.unsplash.com/photo-1581574203466-c3bff1a87fa1", // trumpet
//     "https://images.unsplash.com/photo-1505672678657-cc7037095e2c", // bass
//     "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc", // jazz club
//     "https://images.unsplash.com/photo-1504805572947-34fad45aed93"  // drums
//   ]),
//   blues: buildPack("Blues", [
//     "https://images.unsplash.com/photo-1505685296765-3a2736de412f",
//     "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
//     "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
//     "https://images.unsplash.com/photo-1497032205916-ac775f0649ae",
//     "https://images.unsplash.com/photo-1487215078519-e21cc028cb29",
//     "https://images.unsplash.com/photo-1444824775686-4185f172c44b"
//   ]),
//   salsa: buildPack("Salsa", [
//     "https://images.unsplash.com/photo-1555601568-c9e6f328489b",
//     "https://images.unsplash.com/photo-1603217208787-d8e6fdbba7ec",
//     "https://images.unsplash.com/photo-1549924231-f129b911e442",
//     "https://images.unsplash.com/photo-1549910139-97a324b64f04",
//     "https://images.unsplash.com/photo-1615553120425-6b8f6f3a73f0",
//     "https://images.unsplash.com/photo-1593697820900-3f57a27e0a2e"
//   ]),
//   firepit: buildPack("Firepit", [
//     "https://images.unsplash.com/photo-1478720568477-152d9b164e26",
//     "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
//     "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
//     "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
//     "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
//     "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
//   ]),
//   coffeehouse: buildPack("Coffeehouse", [
//     "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
//     "https://images.unsplash.com/photo-1529070538774-1843cb3265df",
//     "https://images.unsplash.com/photo-1511920170033-f8396924c348",
//     "https://images.unsplash.com/photo-1517705008128-361805f42e86",
//     "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
//     "https://images.unsplash.com/photo-1521747116042-5a810fda9664"
//   ])
// };
