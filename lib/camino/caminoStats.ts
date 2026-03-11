import { prisma } from '@/lib/prisma'

export async function getCaminoStats(userId: string) {
  const entries = await prisma.journalEntry.findMany({
    where: { userId },
    include: {
      stage: true,
    },
  })

  if (!entries.length) return null

  const routeId = entries[0].stage.routeId

  const totalStages = await prisma.stage.count({
    where: { routeId },
  })

  const completedStages = new Set(entries.map((e) => e.stageId)).size

  const totalKm = entries.reduce((sum, e) => sum + e.stage.distanceKm, 0)

  const moods = entries
    .filter((e) => e.mood !== null)
    .map((e) => e.mood as number)

  const avgMood =
    moods.length > 0 ? moods.reduce((a, b) => a + b) / moods.length : null

  const totalBeers = entries.reduce((sum, e) => sum + (e.beers || 0), 0)

  const totalExpenses = entries.reduce((sum, e) => sum + (e.expenses || 0), 0)

  const progress = totalStages > 0 ? (completedStages / totalStages) * 100 : 0

  // NUEVO

  const routeStages = await prisma.stage.findMany({
    where: { routeId },
  })

  const routeTotalKm = routeStages.reduce((sum, s) => sum + s.distanceKm, 0)

  const remainingKm = routeTotalKm - totalKm

  const daysWalked = completedStages

  const avgKmPerDay = daysWalked > 0 ? totalKm / daysWalked : 0

  const etaDays = avgKmPerDay > 0 ? Math.ceil(remainingKm / avgKmPerDay) : null

  return {
    totalKm: Number(totalKm.toFixed(1)),
    remainingKm: Number(remainingKm.toFixed(1)),
    completedStages,
    totalStages,
    progress: Number(progress.toFixed(1)),
    avgMood: avgMood ? Number(avgMood.toFixed(1)) : null,
    totalBeers,
    beersPerKm: totalKm > 0 ? Number((totalBeers / totalKm).toFixed(2)) : 0,
    totalExpenses,

    // NUEVO

    etaDays,
  }
}
