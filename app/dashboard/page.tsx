'use client'

import { useEffect, useState, useRef } from 'react'
import CaminoMap, { CaminoMapRef } from '@/components/map/CaminoMap'
import { useAchievements } from '@/hooks/useAchievements'
import AchievementsPopup from '@/components/ui/AchievementsPopup'
import Timeline from '@/components/camino/Timeline'
import { useCinematicCamino } from '@/hooks/useCinematicCamino'

type Stats = {
  totalKm: number
  completedStages: number
  totalStages: number
  percent: number
  avgMood: number
  totalBeers: number
  beersPerKm: number
  totalExpenses: number
}

type Stage = {
  id: string
  number: number
  from: string
  to: string
  lat: number
  lng: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [progress, setProgress] = useState<any>(null)

  const mapRef = useRef<CaminoMapRef>(null)
  const playCinematic = useCinematicCamino(mapRef)

  // 🔥 fetch stats
  useEffect(() => {
    async function fetchStats() {
      const res = await fetch('/api/stats')
      const data = await res.json()
      setStats(data)
    }

    fetchStats()
  }, [])

  // 🔥 fetch progress REAL
  useEffect(() => {
    async function fetchProgress() {
      const res = await fetch('/api/progress')
      const data = await res.json()
      setProgress(data)
    }

    fetchProgress()
  }, [])

  // 🔥 evitar crash mientras carga
  if (!stats || !progress) return <p>Loading...</p>

  const currentStage = progress.stages.find(
    (s: Stage) => !progress.completedStageIds.includes(s.id),
  )

  const progressData = {
    completedStages: progress.completedStageIds.length,
    totalStages: progress.stages.length,
    currentStageNumber: currentStage?.number || 0,
  }

  const unlocked = useAchievements(progressData)

  const handleStageClick = (stage: Stage) => {
    mapRef.current?.flyTo(stage.lng, stage.lat)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Camino Progress</h1>

      {/* 🎥 CINEMATIC */}
      <button
        onClick={() => playCinematic(progress.stages)}
        className="bg-black text-white px-4 py-2 rounded-xl hover:opacity-80"
      >
        ▶️ Play My Camino
      </button>

      {/* 🗺️ MAPA REAL */}
      <CaminoMap
        ref={mapRef}
        stages={progress.stages}
        completedStageIds={progress.completedStageIds}
      />

      {/* 🎯 TIMELINE REAL */}
      <Timeline
        stages={progress.stages}
        completedStageIds={progress.completedStageIds}
        currentStageId={currentStage?.id}
        onStageClick={(stage) => handleStageClick(stage)}
      />

      {/* 📊 STATS */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard title="KM Walked" value={`${stats.totalKm} km`} />
        <StatCard
          title="Stages Completed"
          value={`${stats.completedStages} / ${stats.totalStages}`}
        />
        <StatCard title="Average Mood" value={`${stats.avgMood}/10`} />
        <StatCard title="Beers" value={`${stats.totalBeers}`} />
        <StatCard
          title="Beers per KM"
          value={(stats.beersPerKm ?? 0).toFixed(2)}
        />
        <StatCard title="Expenses" value={`€${stats.totalExpenses}`} />
      </div>

      {/* 🏆 ACHIEVEMENTS */}
      <AchievementsPopup unlocked={unlocked} />
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  )
}
