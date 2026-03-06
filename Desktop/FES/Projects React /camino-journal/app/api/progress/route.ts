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
        totalKm: 0,
        completedStages: 0,
      })
    }

    const totalKm = entries.reduce((sum, entry) => {
      return sum + (entry.stage?.distanceKm || 0)
    }, 0)

    const completedStages = entries.length

    return NextResponse.json({
      totalKm,
      completedStages,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to calculate progress' },
      { status: 500 }
    )
  }
}
