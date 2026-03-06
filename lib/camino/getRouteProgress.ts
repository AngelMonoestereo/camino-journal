import { prisma } from '@/lib/prisma'

export async function getRouteProgress(userId: string) {
  const entries = await prisma.journalEntry.findMany({
    where: { userId },
    include: {
      stage: true,
    },
  })

  if (entries.length === 0) {
    return null
  }

  const routeId = entries[0].stage.routeId

  const stages = await prisma.stage.findMany({
    where: { routeId },
    orderBy: {
      number: 'asc',
    },
  })

  const completedStageIds = entries.map((e) => e.stageId)

  return {
    stages,
    completedStageIds,
  }
}
