'use client'

import { useEffect, useState } from 'react'
import CaminoMap from '@/components/camino/CaminoMap'

type Stats = {
  totalKm: number
  completedStages: number
  totalStages: number
  progress: number
  avgMood: number
  totalBeers: number
  beersPerKm: number
  totalExpenses: number
}

type Progress = {
  stages: {
    id: string
    number: number
    from: string
    to: string
  }[]
  completedStageIds: string[]
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [progress, setProgress] = useState<Progress | null>(null)

  useEffect(() => {
    async function fetchData() {
      const statsRes = await fetch('/api/stats')
      const statsData = await statsRes.json()

      const progressRes = await fetch('/api/progress')
      const progressData = await progressRes.json()

      setStats(statsData)
      setProgress(progressData)
    }

    fetchData()
  }, [])

  if (!stats) return <p>Loading Camino stats...</p>

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Camino Progress</h1>

      <p className="text-gray-500">
        Track your journey to Santiago de Compostela
      </p>

      <div className="bg-gray-200 rounded-full h-6">
        <div
          className="bg-blue-600 h-6 rounded-full text-center text-white text-sm"
          style={{ width: `${stats.progress}%` }}
        >
          {stats.progress.toFixed(1)}%
        </div>
      </div>

      {/* STATS GRID */}

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

      {/* CAMINO MAP */}

      {progress && (
        <CaminoMap
          stages={progress.stages}
          completedStageIds={progress.completedStageIds}
        />
      )}
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
