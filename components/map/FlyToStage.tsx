'use client'

import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import type { LatLngTuple } from 'leaflet'

type Props = {
  position: LatLngTuple
  zoom?: number
}

export default function FlyToStage({ position, zoom = 11 }: Props) {
  const map = useMap()

  useEffect(() => {
    map.flyTo(position, zoom, {
      duration: 1.8,
    })
  }, [position, zoom, map])

  return null
}
