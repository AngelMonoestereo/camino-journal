import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const { userId } = auth()
  const effectiveUserId = userId || 'demo-user'

  // 🔥 todas las etapas
  const stages = await prisma.stage.findMany({
    orderBy: { number: 'asc' },
  })

  // 🔥 progreso del usuario
  const progress = await prisma.userStageProgress.findMany({
    where: { userId: effectiveUserId },
  })

  const completedStageIds = progress.map((p) => p.stageId)

  const completedStagesData = stages.filter((stage) =>
    completedStageIds.includes(stage.id),
  )

  const totalKm = completedStagesData.reduce(
    (acc, stage) => acc + stage.distanceKm,
    0,
  )

  const totalStages = stages.length
  const completedStages = completedStagesData.length

  const percent =
    totalStages === 0 ? 0 : Math.round((completedStages / totalStages) * 100)

  return NextResponse.json({
    stages, // 🔥 NUEVO
    completedStageIds, // 🔥 NUEVO
    totalKm,
    completedStages,
    totalStages,
    percent,
  })
}
