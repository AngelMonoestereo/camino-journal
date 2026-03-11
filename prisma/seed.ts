import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const frances = await prisma.route.create({
    data: {
      name: 'Camino Francés',
      country: 'France / Spain',
    },
  })

  const stages = [
    {
      number: 1,
      from: 'Saint-Jean-Pied-de-Port',
      to: 'Roncesvalles',
      distance: 25,
    },
    { number: 2, from: 'Roncesvalles', to: 'Zubiri', distance: 21 },
    { number: 3, from: 'Zubiri', to: 'Pamplona', distance: 20 },
    { number: 4, from: 'Pamplona', to: 'Puente la Reina', distance: 24 },
    { number: 5, from: 'Puente la Reina', to: 'Estella', distance: 22 },
    { number: 6, from: 'Estella', to: 'Los Arcos', distance: 21 },
    { number: 7, from: 'Los Arcos', to: 'Logroño', distance: 28 },
    { number: 8, from: 'Logroño', to: 'Nájera', distance: 29 },
    {
      number: 9,
      from: 'Nájera',
      to: 'Santo Domingo de la Calzada',
      distance: 21,
    },
    { number: 10, from: 'Santo Domingo', to: 'Belorado', distance: 23 },
    { number: 11, from: 'Belorado', to: 'San Juan de Ortega', distance: 24 },
    { number: 12, from: 'San Juan de Ortega', to: 'Burgos', distance: 27 },
    { number: 13, from: 'Burgos', to: 'Hornillos', distance: 20 },
    { number: 14, from: 'Hornillos', to: 'Castrojeriz', distance: 20 },
    { number: 15, from: 'Castrojeriz', to: 'Frómista', distance: 25 },
    { number: 16, from: 'Frómista', to: 'Carrión de los Condes', distance: 19 },
    { number: 17, from: 'Carrión', to: 'Terradillos', distance: 26 },
    { number: 18, from: 'Terradillos', to: 'Sahagún', distance: 25 },
    { number: 19, from: 'Sahagún', to: 'El Burgo Ranero', distance: 18 },
    { number: 20, from: 'El Burgo Ranero', to: 'León', distance: 36 },
    { number: 21, from: 'León', to: 'Hospital de Órbigo', distance: 32 },
    { number: 22, from: 'Hospital de Órbigo', to: 'Astorga', distance: 16 },
    { number: 23, from: 'Astorga', to: 'Rabanal', distance: 20 },
    { number: 24, from: 'Rabanal', to: 'Ponferrada', distance: 32 },
    { number: 25, from: 'Ponferrada', to: 'Villafranca', distance: 24 },
    { number: 26, from: 'Villafranca', to: 'O Cebreiro', distance: 28 },
    { number: 27, from: 'O Cebreiro', to: 'Triacastela', distance: 21 },
    { number: 28, from: 'Triacastela', to: 'Sarria', distance: 18 },
    { number: 29, from: 'Sarria', to: 'Portomarín', distance: 22 },
    { number: 30, from: 'Portomarín', to: 'Palas de Rei', distance: 25 },
    { number: 31, from: 'Palas de Rei', to: 'Arzúa', distance: 29 },
    { number: 32, from: 'Arzúa', to: 'Pedrouzo', distance: 19 },
    { number: 33, from: 'Pedrouzo', to: 'Monte do Gozo', distance: 15 },
    {
      number: 34,
      from: 'Monte do Gozo',
      to: 'Santiago de Compostela',
      distance: 5,
    },
  ]

  for (const stage of stages) {
    await prisma.stage.create({
      data: {
        ...stage,
        routeId: frances.id,
      },
    })
  }
}

main()
