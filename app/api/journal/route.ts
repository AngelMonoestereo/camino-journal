import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

// 🔥 GET
export async function GET() {
  try {
    const { userId } = auth()
    const effectiveUserId = userId || 'demo-user'

    const entries = await prisma.journalEntry.findMany({
      where: { userId: effectiveUserId },
      include: { stage: true },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(entries)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to fetch entries' },
      { status: 500 },
    )
  }
}

// 🔥 POST
export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const effectiveUserId = userId || 'demo-user'

    const { content, stageId } = await req.json()

    if (!content) {
      return NextResponse.json({ error: 'Content required' }, { status: 400 })
    }

    const entry = await prisma.journalEntry.create({
      data: {
        userId: effectiveUserId,
        content,
        stageId: stageId ?? null,
      },
    })

    // 🔥 marcar progreso
    if (stageId) {
      const existing = await prisma.userStageProgress.findUnique({
        where: {
          userId_stageId: {
            userId: effectiveUserId,
            stageId,
          },
        },
      })

      if (!existing) {
        await prisma.userStageProgress.create({
          data: {
            userId: effectiveUserId,
            stageId,
          },
        })
      }
    }

    return NextResponse.json(entry, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to create entry' },
      { status: 500 },
    )
  }
}
