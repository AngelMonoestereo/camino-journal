export default function TripsPage() {
  return (
    <main className="min-h-screen bg-[#f6f1e8] text-[#2d2a26] px-6 py-10">
      <section className="max-w-3xl mx-auto">
        <p className="uppercase tracking-[0.3em] text-xs mb-3">
          Camino Companion
        </p>

        <h1 className="text-4xl font-serif mb-4">Mis Aventuras</h1>

        <p className="text-sm text-[#6f6a61] mb-8">
          Recoge fotos, notas, audios y recuerdos del camino, incluso sin
          internet.
        </p>

        <div className="border border-[#c9c0b3] rounded-2xl p-6 bg-[#fbf8f1] shadow-sm">
          <p className="text-xs uppercase tracking-[0.25em] mb-2">Beta Trip</p>

          <h2 className="text-2xl font-serif mb-2">50 y Picos</h2>

          <p className="text-sm text-[#6f6a61] mb-6">
            4 días · Picos de Europa · Julio 2026
          </p>

          <div className="flex items-center justify-between text-sm">
            <span>0 / 4 días completados</span>
            <a
              href="/trips/50-y-picos"
              className="border border-[#2d2a26] px-4 py-2 rounded-full"
            >
              Entrar →
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
