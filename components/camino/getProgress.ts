import { prisma } from '@/lib/prisma'

export async function getProgress(userId: string) {
  const stages = await prisma.stage.findMany({
    orderBy: { number: 'asc' },
  })

  const entries = await prisma.journalEntry.findMany({
    where: { userId },
    include: { stage: true },
  })

  const completedStageIds = entries.map((e) => e.stageId)

  return {
    stages,
    completedStageIds,
  }
}
