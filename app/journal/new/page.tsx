'use client'

import { useState } from 'react'

export default function NewJournalEntry() {
  const [mood, setMood] = useState(8)
  const [beers, setBeers] = useState(0)
  const [expenses, setExpenses] = useState(0)
  const [notes, setNotes] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/journal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 'demo-user',
        stageId: 1,
        mood,
        beers,
        expenses,
        notes,
      }),
    })

    const data = await res.json()

    console.log(data)
    alert('Journal entry saved!')
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">New Camino Journal Entry</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Mood (1-10)</label>
          <input
            type="number"
            value={mood}
            onChange={(e) => setMood(Number(e.target.value))}
            className="w-full border p-2"
          />
        </div>

        <div>
          <label>Beers</label>
          <input
            type="number"
            value={beers}
            onChange={(e) => setBeers(Number(e.target.value))}
            className="w-full border p-2"
          />
        </div>

        <div>
          <label>Expenses (€)</label>
          <input
            type="number"
            value={expenses}
            onChange={(e) => setExpenses(Number(e.target.value))}
            className="w-full border p-2"
          />
        </div>

        <div>
          <label>Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border p-2"
          />
        </div>

        <button type="submit" className="bg-black text-white px-4 py-2">
          Save Entry
        </button>
      </form>
    </div>
  )
}
