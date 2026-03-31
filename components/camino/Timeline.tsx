'use client'

type Stage = {
  id: string
  number: number
}

type Props = {
  stages: Stage[]
  completedStageIds: string[]
  currentStageId?: string
  onStageClick: (stage: Stage) => void
}

export default function Timeline({
  stages,
  completedStageIds,
  currentStageId,
  onStageClick,
}: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto py-3 px-1">
      {stages.map((stage) => {
        const completed = completedStageIds.includes(stage.id)
        const isCurrent = stage.id === currentStageId

        return (
          <button
            key={stage.id}
            onClick={() => onStageClick(stage)}
            className={`
              relative px-3 py-2 rounded-xl text-sm transition-all
              ${completed ? 'bg-green-500 text-white' : 'bg-gray-200'}
              ${isCurrent ? 'scale-110 ring-2 ring-green-400' : ''}
              hover:scale-105
            `}
          >
            {stage.number}

            {/* glow effect */}
            {isCurrent && (
              <span className="absolute inset-0 rounded-xl animate-ping bg-green-400 opacity-30" />
            )}
          </button>
        )
      })}
    </div>
  )
}
