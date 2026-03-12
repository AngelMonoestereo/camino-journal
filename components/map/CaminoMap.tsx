'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import type { LatLngTuple } from 'leaflet'
import FlyToStage from './FlyToStage'

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
  const currentStage = stages.find((stage) =>
    completedStageIds.includes(stage.id)
  )

  const currentPosition: LatLngTuple | null = currentStage
    ? [currentStage.lat, currentStage.lng]
    : null

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Camino Route Progress</h2>

      {/* MAP */}
      <div className="h-[400px] w-full mb-6 rounded-lg overflow-hidden">
        <MapContainer
          center={[42.5, -2.5]}
          zoom={6}
          scrollWheelZoom
          className="h-full w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {currentPosition && (
            <FlyToStage position={currentPosition} zoom={11} />
          )}

          {stages.map((stage) => (
            <Marker key={stage.id} position={[stage.lat, stage.lng]}>
              <Popup>
                Stage {stage.number}: {stage.from} → {stage.to}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* STAGE LIST */}
      <div className="space-y-4">
        {stages.map((stage) => {
          const completed = completedStageIds.includes(stage.id)

          return (
            <div key={stage.id} className="flex items-center gap-4">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                  completed
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {completed ? '✓' : ''}
              </div>

              <div className="text-sm">
                <span className="font-medium">Stage {stage.number}</span>

                <span className="text-gray-600">
                  {' '}
                  {stage.from} → {stage.to}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
