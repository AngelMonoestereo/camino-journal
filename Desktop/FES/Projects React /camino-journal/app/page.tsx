export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="text-center">
        <h1 className="text-4xl font-semibold mb-4">Diario del Peregrino</h1>
        <p className="text-neutral-600">
          Un espacio para documentar tu Camino.
        </p>
        <a
          href="/dashboard"
          className="inline-block mt-6 px-4 py-2 rounded-lg bg-black text-white"
        >
          Ir al dashboard
        </a>
      </div>
    </main>
  )
}
