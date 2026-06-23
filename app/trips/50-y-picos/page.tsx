export default function PicosTripPage() {
  const days = [
    {
      number: 'Día 01',
      title: 'Poncebos / Bulnes',
      description: 'Primer tramo, llegada, café y primeras notas.',
    },
    {
      number: 'Día 02',
      title: 'Bulnes / Pandébano',
      description: 'Subida, mochila, conversación y cansancio bueno.',
    },
    {
      number: 'Día 03',
      title: 'Urriellu',
      description: 'Montaña grande, refugio y memoria de altura.',
    },
    {
      number: 'Día 04',
      title: 'Regreso',
      description: 'Bajada, cierre y lo que quedó por decir.',
    },
  ]

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-[#2d2a26] px-6 py-10">
      <section className="max-w-3xl mx-auto">
        <a href="/trips" className="text-sm underline">
          ← Mis Aventuras
        </a>

        <p className="uppercase tracking-[0.3em] text-xs mt-8 mb-3">
          Beta Trip
        </p>

        <h1 className="text-4xl font-serif mb-3">50 y Picos</h1>

        <p className="text-sm text-[#6f6a61] mb-8">
          4 días · Picos de Europa · Julio 2026
        </p>

        <div className="space-y-4">
          {days.map((day) => (
            <a
              key={day.number}
              href={`/trips/50-y-picos/${day.number
                .toLowerCase()
                .replace('día ', 'dia-')}`}
              className="block border border-[#c9c0b3] rounded-2xl p-5 bg-[#fbf8f1] shadow-sm"
            >
              <p className="text-xs uppercase tracking-[0.25em] mb-2">
                {day.number}
              </p>
              <h2 className="text-2xl font-serif mb-1">{day.title}</h2>
              <p className="text-sm text-[#6f6a61]">{day.description}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
