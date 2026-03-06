type Props = {
  totalKm: number
}

const CAMINO_TOTAL_KM = 780

export default function ProgressTracker({ totalKm }: Props) {
  const progress = (totalKm / CAMINO_TOTAL_KM) * 100

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Camino Progress</h2>

      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-yellow-500 h-4 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-3 text-sm text-gray-600">
        {totalKm.toFixed(1)} km walked
      </p>
    </div>
  )
}
