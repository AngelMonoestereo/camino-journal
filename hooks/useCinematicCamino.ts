import { CaminoMapRef } from '@/components/map/CaminoMap'

export function useCinematicCamino(mapRef: React.RefObject<CaminoMapRef>) {
  return async (stages: { lat: number; lng: number }[]) => {
    for (let i = 0; i < stages.length; i++) {
      const stage = stages[i]

      mapRef.current?.flyTo(stage.lng, stage.lat)

      await new Promise((res) => setTimeout(res, 1200))
    }
  }
}

// import { CaminoMapRef } from '@/components/map/CaminoMap'

// export function useCinematicCamino(mapRef: React.RefObject<CaminoMapRef>) {
//   return async (stages: { lat: number; lng: number }[]) => {
//     for (let i = 0; i < stages.length; i++) {
//       const stage = stages[i]

//       mapRef.current?.flyTo(stage.lng, stage.lat)

//       // espera entre movimientos
//       await new Promise((res) => setTimeout(res, 1200))
//     }
//   }
// }
