import { RefObject } from 'react'
import mapboxgl from 'mapbox-gl'

export function useFlyTo(mapRef: RefObject<mapboxgl.Map>) {
  return (lng: number, lat: number) => {
    mapRef.current?.flyTo({
      center: [lng, lat],
      zoom: 12,
      pitch: 60,
      bearing: -20,
      duration: 2000,
    })
  }
}
