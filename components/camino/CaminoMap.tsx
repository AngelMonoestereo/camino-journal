type Stage = {
  id: string
  number: number
  from: string
  to: string
}

type Props = {
  stages: Stage[]
  completedStageIds: string[]
}

export default function CaminoMap({ stages, completedStageIds }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-6">Camino Route Progress</h2>

      <div className="space-y-4">
        {stages.map((stage) => {
          const completed = completedStageIds.includes(stage.id)

          return (
            <div key={stage.id} className="flex items-center gap-4">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-sm
                ${
                  completed
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {completed ? '✓' : ''}
              </div>

              <div className="text-sm">
                <span className="font-medium">Stage {stage.number}</span>{' '}
                {stage.from} → {stage.to}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
