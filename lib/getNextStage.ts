import { prisma } from '@/lib/prisma'

export async function getNextStage(userId: string) {
  const entries = await prisma.journalEntry.findMany({
    where: { userId },
    include: {
      stage: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  if (entries.length === 0) {
    return null
  }

  const lastEntry = entries[0]

  if (!lastEntry.stage) {
    return null
  }

  const lastStage = lastEntry.stage

  const nextStage = await prisma.stage.findFirst({
    where: {
      routeId: lastStage.routeId,
      number: lastStage.number + 1,
    },
  })

  return {
    currentStage: lastStage,
    nextStage,
  }
}
