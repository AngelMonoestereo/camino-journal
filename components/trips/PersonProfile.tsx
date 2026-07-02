type PersonProfileProps = {
  name: string
  subtitle?: string
  backHref: string
}

export default function PersonProfile({
  name,
  subtitle = 'Compañero de ruta',
  backHref,
}: PersonProfileProps) {
  return (
    <main className="min-h-screen bg-[#f6f1e8] text-[#2d2a26] px-6 py-10">
      <section className="max-w-3xl mx-auto">
        <a href={backHref} className="text-sm underline">
          ← Personas del viaje
        </a>

        <div className="mt-8 border border-[#c9c0b3] rounded-2xl p-6 bg-[#fbf8f1]">
          <p className="uppercase tracking-[0.3em] text-xs mb-3">Crew</p>

          <div className="w-16 h-16 rounded-full border border-[#2d2a26] flex items-center justify-center text-2xl font-serif mb-4">
            {name.charAt(0)}
          </div>

          <h1 className="text-4xl font-serif mb-2">{name}</h1>
          <p className="text-[#6f6a61] mb-8">{subtitle}</p>

          <div className="space-y-5">
            <section>
              <h2 className="text-2xl font-serif mb-2">📝 Notas</h2>
              <textarea
                className="w-full min-h-28 border border-[#c9c0b3] rounded-xl p-3 bg-transparent"
                placeholder="Algo que no quiero olvidar de esta persona..."
              />
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-2">💭 Momento memorable</h2>
              <textarea
                className="w-full min-h-28 border border-[#c9c0b3] rounded-xl p-3 bg-transparent"
                placeholder="Un momento del viaje con esta persona..."
              />
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}
