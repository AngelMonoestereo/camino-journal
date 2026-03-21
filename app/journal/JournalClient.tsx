;('use client')

import { useStages } from '@/hooks/useStages'

export default function JournalClient() {
  const { stages, loading, error } = useStages()

  if (loading) {
    return <div className="p-6">Loading Camino...</div>
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Your Camino</h1>

      {stages.map((stage: any) => (
        <div key={stage.id} className="border p-4 rounded-xl">
          <div>Stage {stage.number}</div>
          <div>
            {stage.from} → {stage.to}
          </div>
        </div>
      ))}
    </div>
  )
}
