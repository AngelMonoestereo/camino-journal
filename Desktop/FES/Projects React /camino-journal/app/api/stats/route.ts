import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCaminoStats } from '@/lib/caminoStats'

// ⚠️ TEMPORAL: sin auth todavía
// Luego lo protegemos con session

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId') ?? 'dev-user-1'

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
  }

  try {
    const stats = await getCaminoStats(userId)

    if (!stats) {
      return NextResponse.json({ message: 'No entries found' }, { status: 200 })
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
