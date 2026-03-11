'use client'

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

export default function StageTimeline({ stages, completedStageIds }: Props) {
  return (
    <div className="overflow-x-auto py-4">
      <div className="flex items-center space-x-4 min-w-max">
        {stages.map((stage) => {
          const completed = completedStageIds.includes(stage.id)

          return (
            <div key={stage.id} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                ${
                  completed
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {completed ? '✓' : stage.number}
              </div>

              {stage.number !== stages.length && (
                <div className="w-10 h-1 bg-gray-300"></div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
