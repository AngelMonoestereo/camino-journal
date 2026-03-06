import { prisma } from '@/lib/prisma'

export async function getUserProgress(userId: string) {
  const entries = await prisma.journalEntry.findMany({
    where: { userId },
    include: {
      stage: true,
    },
  })

  if (!entries.length) {
    return {
      totalKm: 0,
      completedStages: 0,
    }
  }

  const totalKm = entries.reduce((sum, entry) => {
    return sum + entry.stage.distanceKm
  }, 0)

  const completedStages = entries.length

  return {
    totalKm,
    completedStages,
  }
}
