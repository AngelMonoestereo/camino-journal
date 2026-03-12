import { prisma } from '@/lib/prisma'
import CaminoMap from '@/components/camino/CaminoProgress'

export default async function CaminoPage() {
  const stages = await prisma.stage.findMany({
    orderBy: { number: 'asc' },
  })

  // ejemplo de progreso
  const completedStageIds = ['stage1', 'stage2']

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Camino Progress</h1>

      <CaminoMap stages={stages} completedStageIds={completedStageIds} />
    </div>
  )
}
