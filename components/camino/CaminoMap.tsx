'use client'

import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet'
import type { LatLngTuple } from 'leaflet'

type Stage = {
  id: string
  number: number
  from: string
  to: string
  lat: number
  lng: number
}

type Props = {
  stages: Stage[]
  completedStageIds: string[]
}

export default function CaminoMap({ stages, completedStageIds }: Props) {
  const walkedStages = stages.filter((stage) =>
    completedStageIds.includes(stage.id)
  )

  const remainingStages = stages.filter(
    (stage) => !completedStageIds.includes(stage.id)
  )

  const walkedCoords: LatLngTuple[] = walkedStages.map((s) => [s.lat, s.lng])
  const remainingCoords: LatLngTuple[] = remainingStages.map((s) => [
    s.lat,
    s.lng,
  ])

  const center: LatLngTuple = currentStage
    ? [currentStage.lat, currentStage.lng]
    : stages.length
    ? [stages[0].lat, stages[0].lng]
    : [42.5987, -5.5671]

  const currentStageNumber = completedStageIds.length

  const currentStage = stages.find(
    (stage) => stage.number === currentStageNumber + 1
  )

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-6">Camino Route Progress</h2>

      {/* MAP */}

      <div className="h-[400px] mb-8 rounded-lg overflow-hidden">
        <MapContainer center={center} zoom={6} style={{ height: '100%' }}>
          <TileLayer
            attribution="OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* walked route */}
          <Polyline positions={walkedCoords} color="green" />

          {/* remaining route */}
          <Polyline positions={remainingCoords} color="gray" />

          {/* markers */}
          {stages.map((stage) => {
            const isCurrent = currentStage?.id === stage.id

            return <Marker key={stage.id} position={[stage.lat, stage.lng]} />
          })}
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

      {/* TIMELINE */}

      <div className="space-y-4 mt-6">
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
