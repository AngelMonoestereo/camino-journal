import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const entries = await prisma.journalEntry.findMany({
      include: {
        stage: true,
      },
    })

    if (!entries.length) {
      return NextResponse.json({
        stages: [],
        completedStageIds: [],
      })
    }

    const routeId = entries[0].stage.routeId

    const stages = await prisma.stage.findMany({
      where: {
        routeId,
      },
      orderBy: {
        number: 'asc',
      },
      select: {
        id: true,
        number: true,
        from: true,
        to: true,
      },
    })

    const completedStageIds = [...new Set(entries.map((e) => e.stageId))]

    return NextResponse.json({
      stages,
      completedStageIds,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load route progress' },
      { status: 500 }
    )
  }
}
