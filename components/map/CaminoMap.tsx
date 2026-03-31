'use client'

import Map, { Source, Layer, Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useMemo, useRef, forwardRef, useImperativeHandle } from 'react'

type Stage = {
  id: string
  number: number
  lat: number
  lng: number
}

type Props = {
  stages: Stage[]
  completedStageIds: string[]
}

export type CaminoMapRef = {
  flyTo: (lng: number, lat: number) => void
}

const CaminoMap = forwardRef<CaminoMapRef, Props>(
  ({ stages, completedStageIds }, ref) => {
    const mapRef = useRef<any>(null)
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

    // 🔥 ruta completa
    const routeGeoJSON = useMemo(() => {
      return {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: stages.map((s) => [s.lng, s.lat]),
        },
      }
    }, [stages])

    const progress = completedStageIds.length / stages.length

    const currentStage = stages.find((s) => !completedStageIds.includes(s.id))

    // 🔥 EXPONER flyTo al padre
    useImperativeHandle(ref, () => ({
      flyTo(lng: number, lat: number) {
        mapRef.current?.flyTo({
          center: [lng, lat],
          zoom: 12,
          pitch: 60,
          bearing: -20,
          duration: 2000,
        })
      },
    }))

    return (
      <div className="w-full h-[500px] rounded-xl overflow-hidden">
        <Map
          ref={mapRef}
          initialViewState={{
            latitude: stages[0]?.lat,
            longitude: stages[0]?.lng,
            zoom: 6,
            pitch: 30,
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/outdoors-v12"
          mapboxAccessToken={mapboxToken}
        >
          {/* 🟡 Ruta base */}
          <Source
            id="route"
            type="geojson"
            data={routeGeoJSON}
            lineMetrics={true}
          >
            <Layer
              id="route-base"
              type="line"
              paint={{
                'line-color': '#444',
                'line-width': 4,
              }}
            />

            {/* 🟢 Progreso */}
            <Layer
              id="route-progress"
              type="line"
              paint={{
                'line-width': 5,
                'line-gradient': [
                  'interpolate',
                  ['linear'],
                  ['line-progress'],
                  0,
                  '#444',
                  progress,
                  '#00ff88',
                  progress,
                  '#00ff88',
                  progress + 0.001,
                  '#444',
                  1,
                  '#444',
                ],
              }}
            />
          </Source>

          {/* 🧍 Usuario */}
          {currentStage && (
            <Marker longitude={currentStage.lng} latitude={currentStage.lat}>
              <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg" />
            </Marker>
          )}
        </Map>
      </div>
    )
  },
)

CaminoMap.displayName = 'CaminoMap'

export default CaminoMap
