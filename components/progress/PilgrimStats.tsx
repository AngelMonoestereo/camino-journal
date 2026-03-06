type Props = {
  totalKm: number
  completedStages: number
}

export default function PilgrimStats({ totalKm, completedStages }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-xl shadow text-center">
        <p className="text-sm text-gray-500">KM Walked</p>
        <p className="text-xl font-bold">{totalKm}</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow text-center">
        <p className="text-sm text-gray-500">Stages</p>
        <p className="text-xl font-bold">{completedStages}</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow text-center">
        <p className="text-sm text-gray-500">Next Goal</p>
        <p className="text-xl font-bold">Santiago</p>
      </div>
    </div>
  )
}
