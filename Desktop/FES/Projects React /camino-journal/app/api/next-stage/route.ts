import { NextResponse } from 'next/server'
import { getNextStage } from '@/lib/getNextStage'

export async function GET() {
  const userId = 'dev-user-1'

  const data = await getNextStage(userId)

  return NextResponse.json(data)
}
