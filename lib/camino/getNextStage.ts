import { prisma } from '@/lib/prisma'

export async function getNextStage(userId: string) {
  const entries = await prisma.journalEntry.findMany({
    where: { userId },
    include: {
      stage: true,
    },
    orderBy: {
      stage: {
        number: 'desc',
      },
    },
  })

  if (entries.length === 0) {
    return null
  }

  const lastStage = entries[0].stage

  const nextStage = await prisma.stage.findFirst({
    where: {
      routeId: lastStage.routeId,
      number: lastStage.number + 1,
    },
  })

  return nextStage
}
