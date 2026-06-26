'use client'

import { useEffect, useState } from 'react'

export default function Dia01Page() {
  const [route, setRoute] = useState('Poncebos / Bulnes')
  const [note, setNote] = useState('')
  const [savedAt, setSavedAt] = useState('')
  const [mood, setMood] = useState('')
  const [statsCompleted, setStatsCompleted] = useState(false)
  const [closingLine, setClosingLine] = useState('')
  const [dayPeople, setDayPeople] = useState<string[]>([])

  const [statsSummary, setStatsSummary] = useState({
    km: '',
    coffees: '',
    beers: '',
  })
  const [location, setLocation] = useState<{
    lat: number
    lng: number
    savedAt: string
  } | null>(null)

  useEffect(() => {
    const savedRoute = localStorage.getItem('picos-dia-01-route')
    const savedNote = localStorage.getItem('picos-dia-01-note')
    const savedStats = localStorage.getItem('picos-dia-01-stats')

    if (savedStats) {
      const stats = JSON.parse(savedStats)

      const hasData =
        stats.departure ||
        stats.arrival ||
        stats.km ||
        stats.coffees ||
        stats.beers ||
        stats.pain ||
        stats.expenses

      if (hasData) {
        setStatsCompleted(true)
      }

      setStatsSummary({
        km: stats.km || '',
        coffees: stats.coffees || '',
        beers: stats.beers || '',
      })
    }
    const savedDayPeople = localStorage.getItem('picos-dia-01-people')

    if (savedDayPeople) {
      setDayPeople(JSON.parse(savedDayPeople))
    }
    const savedClosingLine = localStorage.getItem('picos-dia-01-closing-line')
    if (savedClosingLine) setClosingLine(savedClosingLine)

    const savedMood = localStorage.getItem('picos-dia-01-mood')
    if (savedMood) setMood(savedMood)

    if (savedRoute) setRoute(savedRoute)
    if (savedNote) setNote(savedNote)
  }, [])

  useEffect(() => {
    localStorage.setItem('picos-dia-01-route', route)
    localStorage.setItem('picos-dia-01-note', note)
    localStorage.setItem('picos-dia-01-mood', mood)
    localStorage.setItem('picos-dia-01-closing-line', closingLine)
    localStorage.setItem('picos-dia-01-people', JSON.stringify(dayPeople))
    setSavedAt(
      new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    )
  }, [route, note, mood, closingLine, dayPeople])
  function togglePerson(person: string) {
    setDayPeople((currentPeople) =>
      currentPeople.includes(person)
        ? currentPeople.filter((item) => item !== person)
        : [...currentPeople, person],
    )
  }
  function handleSaveLocation() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported on this device.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          savedAt: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        }

        setLocation(newLocation)
        localStorage.setItem(
          'picos-dia-01-location',
          JSON.stringify(newLocation),
        )
      },
      () => {
        alert('Could not get your location.')
      },
    )
  }

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-[#2d2a26] px-6 py-10">
      <section className="max-w-3xl mx-auto">
        <a href="/trips/50-y-picos" className="text-sm underline">
          ← 50 y Picos
        </a>

        <p className="uppercase tracking-[0.3em] text-xs mt-8 mb-3">Día 01</p>

        <h1 className="text-4xl font-serif mb-2">{route}</h1>

        <p className="text-sm text-[#6f6a61] mb-8">
          Primer tramo, llegada, café y primeras notas.
        </p>

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
          <section className="border border-[#c9c0b3] rounded-2xl p-5 bg-[#fbf8f1]">
            <h2 className="text-2xl font-serif mb-3">¿Cómo te sentiste hoy?</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Bien', 'Cansado', 'Encabronado', 'Agradecido'].map((item) => (
                <button
                  key={item}
                  onClick={() => setMood(item)}
                  className={`border rounded-2xl p-4 ${
                    mood === item
                      ? 'border-[#2d2a26] bg-[#2d2a26] text-white'
                      : 'border-[#c9c0b3]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {mood && (
              <p className="mt-3 text-xs text-[#6f6a61]">
                Estado guardado: {mood}
              </p>
            )}
          </section>
          <a
            href="/trips/50-y-picos/dia-01/stats"
            className="block border border-[#c9c0b3] rounded-2xl p-6 bg-[#fbf8f1] mb-6 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="uppercase tracking-[0.2em] text-sm text-[#6f6a61]">
                  📊 Datos del día
                </p>

                <h3 className="text-2xl font-serif mt-2">
                  {statsCompleted
                    ? 'Datos completados'
                    : 'Completar estadísticas'}
                </h3>

                {statsCompleted && (
                  <p className="text-green-700 text-sm mt-2">✓ Completado</p>
                )}

                <p className="mt-2 text-[#6f6a61]">
                  {statsCompleted
                    ? `${statsSummary.km || '-'} km · ☕ ${statsSummary.coffees || 0} · 🍺 ${statsSummary.beers || 0}`
                    : 'Km, cafés, cervezas, gastos y dolor físico.'}
                </p>
              </div>

              <div className="text-2xl">→</div>
            </div>
          </a>
          <section className="border border-[#c9c0b3] rounded-2xl p-5 bg-[#fbf8f1]">
            <h2 className="text-2xl font-serif mb-3">🌅 Frase final del día</h2>

            <input
              className="w-full border border-[#c9c0b3] rounded-xl p-3 bg-transparent"
              placeholder="Una frase para recordar este día..."
              value={closingLine}
              onChange={(e) => setClosingLine(e.target.value)}
            />

            {closingLine && (
              <p className="mt-3 text-sm italic text-[#6f6a61]">
                “{closingLine}”
              </p>
            )}
          </section>
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

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={handleSaveLocation}
              className="border border-[#2d2a26] rounded-2xl p-4"
            >
              📍 Guardar ubicación
            </button>

            <button className="border border-[#2d2a26] rounded-2xl p-4">
              📸 Añadir foto
            </button>
            <button className="border border-[#2d2a26] rounded-2xl p-4">
              🎙 Grabar audio
            </button>
          </section>
          {location && (
            <p className="text-xs text-[#6f6a61]">
              📍 Ubicación guardada a las {location.savedAt}:{' '}
              {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
