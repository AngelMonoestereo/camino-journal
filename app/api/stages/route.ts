import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json([], { status: 401 })
  }

  const userRoute = await prisma.route.findFirst({
    where: { userId, isOfficial: false },
    include: { stages: true },
  })

  if (!userRoute) {
    return NextResponse.json([])
  }

  return NextResponse.json(userRoute.stages)
}
