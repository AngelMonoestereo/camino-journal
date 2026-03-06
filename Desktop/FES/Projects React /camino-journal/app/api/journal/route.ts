import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

// 🔥 GET - Traer entradas del usuario con su etapa
export async function GET() {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const entries = await prisma.journalEntry.findMany({
      where: {
        userId: userId,
      },
      include: {
        stage: true, // incluye información de la etapa
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(entries)
  } catch (error) {
    console.error('GET /api/journal error:', error)

    return NextResponse.json(
      { error: 'Failed to fetch journal entries' },
      { status: 500 }
    )
  }
}

// 🔥 POST - Crear entrada con etapa
export async function POST(req: Request) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { content, stageId } = body

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      )
    }

    const entry = await prisma.journalEntry.create({
      data: {
        userId,
        content,
        stageId: stageId ?? null,
      },
    })

    return NextResponse.json(entry, { status: 201 })
  } catch (error) {
    console.error('POST /api/journal error:', error)

    return NextResponse.json(
      { error: 'Failed to create journal entry' },
      { status: 500 }
    )
  }
}
