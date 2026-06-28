'use client'

import { useEffect, useState } from 'react'
import MoodSelector from '@/components/trips/MoodSelector'
import QuoteCard from '@/components/trips/QuoteCard'

type DayPageProps = {
  dayNumber: string
  defaultRoute: string
  subtitle: string
  statsHref: string
}

export default function DayPage({
  dayNumber,
  defaultRoute,
  subtitle,
  statsHref,
}: DayPageProps) {
  const storageKey = `picos-dia-${dayNumber}`

  const [route, setRoute] = useState(defaultRoute)
  const [note, setNote] = useState('')
  const [mood, setMood] = useState('')
  const [closingLine, setClosingLine] = useState('')
  const [dayPeople, setDayPeople] = useState<string[]>([])
  const [savedAt, setSavedAt] = useState('')

  useEffect(() => {
    setRoute(localStorage.getItem(`${storageKey}-route`) || defaultRoute)
    setNote(localStorage.getItem(`${storageKey}-note`) || '')
    setMood(localStorage.getItem(`${storageKey}-mood`) || '')
    setClosingLine(localStorage.getItem(`${storageKey}-closing-line`) || '')

    const savedPeople = localStorage.getItem(`${storageKey}-people`)
    if (savedPeople) setDayPeople(JSON.parse(savedPeople))
  }, [defaultRoute, storageKey])

  useEffect(() => {
    localStorage.setItem(`${storageKey}-route`, route)
    localStorage.setItem(`${storageKey}-note`, note)
    localStorage.setItem(`${storageKey}-mood`, mood)
    localStorage.setItem(`${storageKey}-closing-line`, closingLine)
    localStorage.setItem(`${storageKey}-people`, JSON.stringify(dayPeople))

    setSavedAt(
      new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    )
  }, [route, note, mood, closingLine, dayPeople, storageKey])

  function togglePerson(person: string) {
    setDayPeople((currentPeople) =>
      currentPeople.includes(person)
        ? currentPeople.filter((item) => item !== person)
        : [...currentPeople, person],
    )
  }

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-[#2d2a26] px-6 py-10">
      <section className="max-w-3xl mx-auto">
        <a href="/trips/50-y-picos" className="text-sm underline">
          ← 50 y Picos
        </a>

        <p className="uppercase tracking-[0.3em] text-xs mt-8 mb-3">
          Día {dayNumber}
        </p>

        <h1 className="text-4xl font-serif mb-2">{route}</h1>

        <p className="text-sm text-[#6f6a61] mb-8">{subtitle}</p>

        <div className="space-y-5">
          <section className="border border-[#c9c0b3] rounded-2xl p-5 bg-[#fbf8f1]">
            <h2 className="text-2xl font-serif mb-3">Ruta del día</h2>
            <input
              className="w-full border border-[#c9c0b3] rounded-xl p-3 bg-transparent"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
            />
          </section>

          <section className="border border-[#c9c0b3] rounded-2xl p-5 bg-[#fbf8f1]">
            <h2 className="text-2xl font-serif mb-3">
              ¿Qué no quieres olvidar de hoy?
            </h2>

            <textarea
              className="w-full min-h-32 border border-[#c9c0b3] rounded-xl p-3 bg-transparent"
              placeholder="Escribe una nota rápida..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <p className="mt-2 text-xs text-[#6f6a61]">
              ✓ Saved locally {savedAt && `at ${savedAt}`}
            </p>
          </section>

          <MoodSelector mood={mood} onChange={setMood} />

          <a
            href={statsHref}
            className="block border border-[#c9c0b3] rounded-2xl p-6 bg-[#fbf8f1] hover:shadow-md transition"
          >
            <p className="uppercase tracking-[0.2em] text-sm text-[#6f6a61]">
              📊 Datos del día
            </p>

            <h3 className="text-2xl font-serif mt-2">Completar estadísticas</h3>

            <p className="mt-2 text-[#6f6a61]">
              Km, cafés, cervezas, gastos y dolor físico.
            </p>
          </a>

          <QuoteCard value={closingLine} onChange={setClosingLine} />

          <section className="border border-[#c9c0b3] rounded-2xl p-5 bg-[#fbf8f1]">
            <h2 className="text-2xl font-serif mb-3">
              👥 ¿Con quién caminaste hoy?
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {['Ángel', 'Josie', 'Fran', 'Alejandro', 'Cristina'].map(
                (person) => (
                  <button
                    key={person}
                    onClick={() => togglePerson(person)}
                    className={`border rounded-2xl p-4 ${
                      dayPeople.includes(person)
                        ? 'border-[#2d2a26] bg-[#2d2a26] text-white'
                        : 'border-[#c9c0b3]'
                    }`}
                  >
                    {person}
                  </button>
                ),
              )}
            </div>

            {dayPeople.length > 0 && (
              <p className="mt-3 text-xs text-[#6f6a61]">
                Personas guardadas: {dayPeople.join(', ')}
              </p>
            )}
          </section>
        </div>
      </section>
    </main>
  )
}
