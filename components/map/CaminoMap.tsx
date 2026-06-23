'use client'

import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap,
} from 'react-leaflet'
import L, { LatLngTuple } from 'leaflet'
import { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'

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

/* Fix Leaflet icons */

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

/* Custom stage icon */

const createStageIcon = (
  number: number,
  completed: boolean,
  current: boolean
) =>
  L.divIcon({
    html: `
      <div style="
        background:${current ? '#f59e0b' : completed ? '#16a34a' : '#e5e7eb'};
        color:white;
        width:28px;
        height:28px;
        border-radius:50%;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:13px;
        font-weight:600;
        border:2px solid white;
        box-shadow:0 0 4px rgba(0,0,0,0.3);
      ">
        ${number}
      </div>
    `,
    className: '',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  })

/* Auto zoom */

function FitBounds({ coords }: { coords: LatLngTuple[] }) {
  const map = useMap()

  useEffect(() => {
    if (coords.length > 1) {
      map.fitBounds(coords)
    }
  }, [coords, map])

  return null
}

/* Button to center map */

function CenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap()

  return (
    <button
      className="absolute top-4 right-4 bg-white px-3 py-1 text-xs rounded shadow"
      onClick={() => map.flyTo([lat, lng], 10)}
    >
      Center on Current Stage
    </button>
  )
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

  const caminoCoords: LatLngTuple[] = caminoRoute.map((c) => [c.lat, c.lng])

  const currentStage = stages.find(
    (stage) => !completedStageIds.includes(stage.id)
  )

  const start = stages[0]
  const finish = stages[stages.length - 1]

  /* walked animation */

  const [progressIndex, setProgressIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressIndex((prev) => (prev < walkedCoords.length ? prev + 1 : prev))
    }, 40)

    return () => clearInterval(interval)
  }, [walkedCoords.length])

  /* route intro animation */

  const [routeProgress, setRouteProgress] = useState(0)

  useEffect(() => {
    let i = 0

    const interval = setInterval(() => {
      i++
      setRouteProgress(i)

      if (i >= caminoCoords.length) clearInterval(interval)
    }, 10)

    return () => clearInterval(interval)
  }, [caminoCoords.length])

  const percent = Math.round((walkedStages.length / stages.length) * 100)

  /* GPS location */

  const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null)

  const locateUser = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation([pos.coords.latitude, pos.coords.longitude])
    })
  }

  return (
    <div className="w-full">
      {/* Progress Bar */}

      <div className="mb-4">
        <p className="text-sm font-semibold">Camino Progress</p>

        <div className="w-full bg-gray-200 h-2 rounded">
          <div
            className="bg-green-600 h-2 rounded"
            style={{ width: `${percent}%` }}
          />
        </div>

        <p className="text-xs mt-1 text-gray-600">
          {walkedStages.length} / {stages.length} stages completed
        </p>
      </div>

      {/* Buttons */}

      <div className="flex gap-2 mb-3">
        {currentStage && (
          <button
            className="bg-black text-white px-3 py-1 text-xs rounded"
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent('center-map', {
                  detail: [currentStage.lat, currentStage.lng],
                })
              )
            }
          >
            Go to Current Stage
          </button>
        )}

        <button
          onClick={locateUser}
          className="bg-gray-800 text-white px-3 py-1 text-xs rounded"
        >
          Locate Me
        </button>
      </div>

      {/* Map */}

      <div className="h-[520px] rounded-xl overflow-hidden">
        <MapContainer
          center={[42.8169, -1.6432]}
          zoom={7}
          scrollWheelZoom
          className="h-full w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
          />

          <FitBounds coords={walkedCoords} />

          {/* Camino route animation */}

          <Polyline
            positions={caminoCoords.slice(0, routeProgress)}
            pathOptions={{
              color: '#f59e0b',
              weight: 4,
            }}
          />

          {/* walked route */}

          {walkedCoords.length > 1 && (
            <Polyline
              positions={walkedCoords.slice(0, progressIndex)}
              pathOptions={{
                color: '#16a34a',
                weight: 5,
              }}
            />
          )}

          {/* remaining */}

          {remainingCoords.length > 1 && (
            <Polyline
              positions={remainingCoords}
              pathOptions={{
                color: '#d1d5db',
                weight: 5,
              }}
            />
          )}

          {/* start */}

          {start && (
            <Marker position={[start.lat, start.lng]}>
              <Popup>Start of Camino</Popup>
            </Marker>
          )}

          {/* finish */}

          {finish && (
            <Marker position={[finish.lat, finish.lng]}>
              <Popup>Santiago de Compostela</Popup>
            </Marker>
          )}

          {/* user GPS */}

          {userLocation && (
            <Marker position={userLocation}>
              <Popup>You are here</Popup>
            </Marker>
          )}

          {/* stage markers */}

          {stages.map((stage) => {
            const completed = completedStageIds.includes(stage.id)
            const current = currentStage?.id === stage.id

            return (
              <Marker
                key={stage.id}
                position={[stage.lat, stage.lng]}
                icon={createStageIcon(stage.number, completed, current)}
              >
                <Popup>
                  <p className="font-semibold">Stage {stage.number}</p>

                  <p>
                    {stage.from} → {stage.to}
                  </p>

                  <p
                    className={
                      completed
                        ? 'text-green-600'
                        : current
                        ? 'text-yellow-600'
                        : 'text-gray-500'
                    }
                  >
                    {completed
                      ? 'Completed'
                      : current
                      ? 'Current Stage'
                      : 'Upcoming'}
                  </p>
                </Popup>
              </Marker>
            )
          })}
        </MapContainer>
      </div>
    </div>
  )
}
