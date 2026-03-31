'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet'
import type { LatLngTuple } from 'leaflet'
import caminoRoute from '@/data/camino-frances'

type Stage = {
  id: string
  number: number
  from: string
  to: string
  lat: number
  lng: number
  completed: boolean
}

type ProgressData = {
  totalKm: number
  completedStages: number
  totalStages: number
  percent: number
  currentStage: Stage | null
}

type Props = {
  stages: Stage[]
}

export default function CaminoMap({ stages }: Props) {
  const [progress, setProgress] = useState<ProgressData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch('/api/progress')
        const data = await res.json()
        setProgress(data)
      } catch (err) {
        console.error('Error fetching progress:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProgress()
  }, [])

  if (loading) {
    return <div className="p-6">Loading progress...</div>
  }

  const completedStageIds =
    progress?.completedStages && stages.length
      ? stages.slice(0, progress.completedStages).map((s) => s.id)
      : []

  const walkedStages = stages.filter((stage) =>
    completedStageIds.includes(stage.id),
  )

  const remainingStages = stages.filter(
    (stage) => !completedStageIds.includes(stage.id),
  )

  const walkedCoords: LatLngTuple[] = walkedStages.map((s) => [s.lat, s.lng])

  const remainingCoords: LatLngTuple[] = remainingStages.map((s) => [
    s.lat,
    s.lng,
  ])

  const caminoCoords: LatLngTuple[] = caminoRoute.geometry.coordinates.map(
    ([lng, lat]: [number, number]) => [lat, lng],
  )

  const currentStage = progress?.currentStage

  const center: LatLngTuple = currentStage
    ? [currentStage.lat, currentStage.lng]
    : stages.length
      ? [stages[0].lat, stages[0].lng]
      : [42.5987, -5.5671]

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Camino Route Progress</h2>

      {/* STATS 🔥 */}

      <div className="mb-6 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-500">Km Walked</p>
          <p className="text-xl font-bold">{progress?.totalKm} km</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Stages</p>
          <p className="text-xl font-bold">
            {progress?.completedStages}/{progress?.totalStages}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Progress</p>
          <p className="text-xl font-bold">{progress?.percent}%</p>
        </div>
      </div>

      {/* MAP */}

      <div className="h-[400px] mb-8 rounded-lg overflow-hidden">
        <MapContainer center={center} zoom={6} style={{ height: '100%' }}>
          <TileLayer
            attribution="OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Polyline positions={caminoCoords} color="#FFD700" weight={4} />

          <Polyline positions={walkedCoords} color="green" />

          <Polyline positions={remainingCoords} color="gray" />

          {stages.map((stage) => (
            <Marker key={stage.id} position={[stage.lat, stage.lng]}>
              <Popup>
                <strong>Stage {stage.number}</strong>
                <br />
                {stage.from} → {stage.to}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* YOU ARE HERE */}

      <div className="mt-6 bg-gray-50 p-4 rounded-lg border">
        <p className="text-sm text-gray-500">📍 You are here</p>

        {currentStage ? (
          <p className="font-medium">
            Stage {currentStage.number} {currentStage.from} → {currentStage.to}
          </p>
        ) : (
          <p className="font-medium text-green-600">
            🎉 Camino Completed — Santiago de Compostela
          </p>
        )}
      </div>
    </div>
  )
}
