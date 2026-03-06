import { prisma } from '@/lib/prisma'

export async function getCaminoStats(userId: string) {
  // 1️⃣ Buscar entries del usuario
  const entries = await prisma.journalEntry.findMany({
    where: { userId },
    include: {
      stage: {
        include: {
          route: true,
        },
      },
    },
  })

  if (!entries.length) {
    return null
  }

  // 2️⃣ Route actual (del primer entry)
  const routeId = entries[0].stage.routeId

  // 3️⃣ Total de stages del Camino
  const totalStages = await prisma.stage.count({
    where: { routeId },
  })

  // 4️⃣ Stages completados (evita duplicados)
  const completedStages = new Set(entries.map((e) => e.stageId)).size

  // 5️⃣ Kilómetros caminados
  const totalKm = entries.reduce((sum, e) => sum + e.stage.distanceKm, 0)

  // 6️⃣ Promedio de mood
  const moods = entries
    .filter((e) => e.mood !== null)
    .map((e) => e.mood as number)

  const avgMood =
    moods.length > 0
      ? moods.reduce((sum, m) => sum + m, 0) / moods.length
      : null

  // 7️⃣ Cervezas
  const totalBeers = entries.reduce((sum, e) => sum + (e.beers || 0), 0)

  // 8️⃣ Gastos
  const totalExpenses = entries.reduce((sum, e) => sum + (e.expenses || 0), 0)

  // 9️⃣ Progreso del Camino
  const progress = totalStages > 0 ? (completedStages / totalStages) * 100 : 0

  return {
    totalKm: Number(totalKm.toFixed(1)),
    completedStages,
    totalStages,
    progress: Number(progress.toFixed(1)),
    avgMood: avgMood ? Number(avgMood.toFixed(1)) : null,
    totalBeers,
    beersPerKm: totalKm > 0 ? Number((totalBeers / totalKm).toFixed(2)) : 0,
    totalExpenses,
  }
}
