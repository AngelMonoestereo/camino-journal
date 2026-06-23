'use client'

import { useEffect, useState } from 'react'

export default function StatsPage() {
  const [departure, setDeparture] = useState('')
  const [arrival, setArrival] = useState('')
  const [km, setKm] = useState('')
  const [coffees, setCoffees] = useState('')
  const [beers, setBeers] = useState('')
  const [pain, setPain] = useState('')
  const [expenses, setExpenses] = useState('')
  const [savedAt, setSavedAt] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('picos-dia-01-stats')

    if (saved) {
      const data = JSON.parse(saved)

      setDeparture(data.departure || '')
      setArrival(data.arrival || '')
      setKm(data.km || '')
      setCoffees(data.coffees || '')
      setBeers(data.beers || '')
      setPain(data.pain || '')
      setExpenses(data.expenses || '')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      'picos-dia-01-stats',
      JSON.stringify({
        departure,
        arrival,
        km,
        coffees,
        beers,
        pain,
        expenses,
      }),
    )

    setSavedAt(
      new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    )
  }, [departure, arrival, km, coffees, beers, pain, expenses])

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-[#2d2a26] px-6 py-10">
      <section className="max-w-3xl mx-auto">
        <a href="/trips/50-y-picos/dia-01" className="text-sm underline">
          ← Día 01
        </a>

        <h1 className="text-4xl font-serif mt-8 mb-8">📊 Datos del día</h1>

        <div className="space-y-4">
          <input
            placeholder="Hora de salida"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            className="w-full border rounded-xl p-3"
          />

          <input
            placeholder="Hora de llegada"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
            className="w-full border rounded-xl p-3"
          />

          <input
            placeholder="Km recorridos"
            value={km}
            onChange={(e) => setKm(e.target.value)}
            className="w-full border rounded-xl p-3"
          />

          <input
            placeholder="☕ Cafés"
            value={coffees}
            onChange={(e) => setCoffees(e.target.value)}
            className="w-full border rounded-xl p-3"
          />

          <input
            placeholder="🍺 Cervezas"
            value={beers}
            onChange={(e) => setBeers(e.target.value)}
            className="w-full border rounded-xl p-3"
          />

          <input
            placeholder="🤕 Dolor físico (1-10)"
            value={pain}
            onChange={(e) => setPain(e.target.value)}
            className="w-full border rounded-xl p-3"
          />

          <input
            placeholder="💸 Gastos €"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            className="w-full border rounded-xl p-3"
          />

          <p className="text-xs text-[#6f6a61]">
            ✓ Saved locally {savedAt && `at ${savedAt}`}
          </p>
        </div>
      </section>
    </main>
  )
}
