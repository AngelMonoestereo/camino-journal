'use client'

import Link from 'next/link'

const people = ['Ángel', 'Josie', 'Fran', 'Alejandro', 'Cristina']

export default function PeoplePage() {
  return (
    <main className="min-h-screen bg-[#f6f1e8] text-[#2d2a26] px-6 py-10">
      <section className="max-w-3xl mx-auto">
        <Link href="/trips/50-y-picos" className="text-sm underline">
          ← 50 y Picos
        </Link>

        <p className="uppercase tracking-[0.3em] text-xs mt-8 mb-3">Crew</p>

        <h1 className="text-4xl font-serif mb-8">Personas del viaje</h1>

        <div className="space-y-4">
          {people.map((person) => (
            <div
              key={person}
              className="border border-[#c9c0b3] rounded-2xl p-5 bg-[#fbf8f1]"
            >
              <h2 className="text-2xl font-serif">{person}</h2>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
