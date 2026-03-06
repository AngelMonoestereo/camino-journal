'use client'

import { useEffect, useState } from 'react'

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

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    async function fetchStats() {
      const res = await fetch('/api/stats')
      const data = await res.json()
      setStats(data)
    }

    fetchStats()
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
