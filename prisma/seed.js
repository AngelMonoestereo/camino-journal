// prisma/seed.js
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const STAGES_FRANCES = [
  { number: 1,  title: "Saint-Jean → Roncesvalles", from: "Saint-Jean-Pied-de-Port", to: "Roncesvalles", distanceKm: 25.0, elevation: 1200 },
  { number: 2,  title: "Roncesvalles → Zubiri", from: "Roncesvalles", to: "Zubiri", distanceKm: 21.0, elevation: 400 },
  { number: 3,  title: "Zubiri → Pamplona", from: "Zubiri", to: "Pamplona", distanceKm: 20.0, elevation: 250 },
  { number: 4,  title: "Pamplona → Puente la Reina", from: "Pamplona", to: "Puente la Reina", distanceKm: 24.0, elevation: 300 },
  { number: 5,  title: "Puente la Reina → Estella", from: "Puente la Reina", to: "Estella", distanceKm: 22.0, elevation: 300 },
  { number: 6,  title: "Estella → Los Arcos", from: "Estella", to: "Los Arcos", distanceKm: 21.0, elevation: 250 },
  { number: 7,  title: "Los Arcos → Logroño", from: "Los Arcos", to: "Logroño", distanceKm: 28.0, elevation: 250 },
  { number: 8,  title: "Logroño → Nájera", from: "Logroño", to: "Nájera", distanceKm: 29.0, elevation: 250 },
  { number: 9,  title: "Nájera → Santo Domingo de la Calzada", from: "Nájera", to: "Santo Domingo de la Calzada", distanceKm: 21.0, elevation: 200 },
  { number: 10, title: "Santo Domingo → Belorado", from: "Santo Domingo de la Calzada", to: "Belorado", distanceKm: 22.0, elevation: 250 },
  { number: 11, title: "Belorado → San Juan de Ortega", from: "Belorado", to: "San Juan de Ortega", distanceKm: 24.0, elevation: 400 },
  { number: 12, title: "San Juan de Ortega → Burgos", from: "San Juan de Ortega", to: "Burgos", distanceKm: 26.0, elevation: 200 },
  { number: 13, title: "Burgos → Hornillos del Camino", from: "Burgos", to: "Hornillos del Camino", distanceKm: 21.0, elevation: 150 },
  { number: 14, title: "Hornillos → Castrojeriz", from: "Hornillos del Camino", to: "Castrojeriz", distanceKm: 20.0, elevation: 200 },
  { number: 15, title: "Castrojeriz → Frómista", from: "Castrojeriz", to: "Frómista", distanceKm: 25.0, elevation: 250 },
  { number: 16, title: "Frómista → Carrión de los Condes", from: "Frómista", to: "Carrión de los Condes", distanceKm: 19.0, elevation: 100 },
  { number: 17, title: "Carrión → Terradillos de los Templarios", from: "Carrión de los Condes", to: "Terradillos de los Templarios", distanceKm: 26.0, elevation: 150 },
  { number: 18, title: "Terradillos → El Burgo Ranero", from: "Terradillos de los Templarios", to: "El Burgo Ranero", distanceKm: 30.0, elevation: 120 },
  { number: 19, title: "El Burgo Ranero → León", from: "El Burgo Ranero", to: "León", distanceKm: 38.0, elevation: 150 },
  { number: 20, title: "León → Hospital de Órbigo", from: "León", to: "Hospital de Órbigo", distanceKm: 32.0, elevation: 150 },
  { number: 21, title: "Hospital de Órbigo → Astorga", from: "Hospital de Órbigo", to: "Astorga", distanceKm: 16.0, elevation: 200 },
  { number: 22, title: "Astorga → Rabanal del Camino", from: "Astorga", to: "Rabanal del Camino", distanceKm: 21.0, elevation: 600 },
  { number: 23, title: "Rabanal → Ponferrada", from: "Rabanal del Camino", to: "Ponferrada", distanceKm: 33.0, elevation: 300 },
  { number: 24, title: "Ponferrada → Villafranca del Bierzo", from: "Ponferrada", to: "Villafranca del Bierzo", distanceKm: 23.0, elevation: 250 },
  { number: 25, title: "Villafranca → O Cebreiro", from: "Villafranca del Bierzo", to: "O Cebreiro", distanceKm: 30.0, elevation: 1000 },
  { number: 26, title: "O Cebreiro → Triacastela", from: "O Cebreiro", to: "Triacastela", distanceKm: 21.0, elevation: 450 },
  { number: 27, title: "Triacastela → Sarria", from: "Triacastela", to: "Sarria", distanceKm: 18.0, elevation: 250 },
  { number: 28, title: "Sarria → Portomarín", from: "Sarria", to: "Portomarín", distanceKm: 22.0, elevation: 300 },
  { number: 29, title: "Portomarín → Palas de Rei", from: "Portomarín", to: "Palas de Rei", distanceKm: 25.0, elevation: 300 },
  { number: 30, title: "Palas de Rei → Arzúa", from: "Palas de Rei", to: "Arzúa", distanceKm: 29.0, elevation: 350 },
  { number: 31, title: "Arzúa → O Pedrouzo", from: "Arzúa", to: "O Pedrouzo", distanceKm: 20.0, elevation: 250 },
  { number: 32, title: "O Pedrouzo → Santiago", from: "O Pedrouzo", to: "Santiago de Compostela", distanceKm: 20.0, elevation: 300 },
  { number: 33, title: "Santiago → Negreira", from: "Santiago de Compostela", to: "Negreira", distanceKm: 21.0, elevation: 350 },
  { number: 34, title: "Negreira → Olveiroa", from: "Negreira", to: "Olveiroa", distanceKm: 33.0, elevation: 500 },
];

async function main() {
  // 1) Upsert Route oficial
  const route = await prisma.route.create({
  data: {
    name: "Camino Francés",
    slug: "camino-frances",
    isOfficial: true
  }
});

  // 2) Limpia stages anteriores de esta ruta (para evitar duplicados)
  await prisma.stage.deleteMany({ where: { routeId: route.id } });

  // 3) Inserta stages
  await prisma.stage.createMany({
    data: STAGES_FRANCES.map((s) => ({ ...s, routeId: route.id })),
  });

  console.log(`✅ Seed OK: Camino Francés + ${STAGES_FRANCES.length} stages`);
  console.log(`RouteId: ${route.id}`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });