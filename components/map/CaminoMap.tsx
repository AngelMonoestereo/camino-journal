'use client'

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from 'react-leaflet'

import type { LatLngTuple } from 'leaflet'
import FlyToStage from './FlyToStage'
import caminoRoute from '@/data/camino-frances'

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

  const currentStage = walkedStages[walkedStages.length - 1]

  const currentPosition: LatLngTuple | null = currentStage
    ? [currentStage.lat, currentStage.lng]
    : null

  // convertir GeoJSON [lng, lat] → Leaflet [lat, lng]
  const caminoCoords: LatLngTuple[] = caminoRoute.geometry.coordinates.map(
    ([lng, lat]) => [lat, lng]
  )

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Camino Route Progress</h2>

      <div className="h-[420px] w-full mb-6 rounded-lg overflow-hidden">
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

          {/* Camino completo */}
          <Polyline
            positions={caminoCoords}
            pathOptions={{
              color: '#facc15',
              weight: 4,
            }}
          />

          {/* progreso caminando */}
          <Polyline
            positions={walkedCoords}
            pathOptions={{
              color: 'green',
              weight: 6,
            }}
          />

          {/* restante */}
          <Polyline
            positions={remainingCoords}
            pathOptions={{
              color: '#9ca3af',
              weight: 3,
              dashArray: '6',
            }}
          />

          {currentPosition && (
            <FlyToStage position={currentPosition} zoom={11} />
          )}

          {stages.map((stage) => {
            const completed = completedStageIds.includes(stage.id)

            return (
              <Marker key={stage.id} position={[stage.lat, stage.lng]}>
                <Popup>
                  <strong>Stage {stage.number}</strong>
                  <br />
                  {stage.from} → {stage.to}
                  <br />
                  {completed ? 'Completed ✅' : 'Upcoming'}
                </Popup>
              </Marker>
            )
          })}
        </MapContainer>
      </div>
    </div>
  )
}
