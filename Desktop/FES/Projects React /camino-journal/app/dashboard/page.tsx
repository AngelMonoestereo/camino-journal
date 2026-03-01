'use client'

import { useState } from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

export default function DashboardPage() {
  const [entry, setEntry] = useState('')
  const [entries, setEntries] = useState<string[]>([])

  const handleSubmit = () => {
    if (!entry.trim()) return
    setEntries([entry, ...entries])
    setEntry('')
  }

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Mi Diario</h1>
          <UserButton afterSignOutUrl="/" />
        </div>

        <SignedOut>
          <div className="mt-8 rounded-xl border p-6">
            <p className="mb-4">Inicia sesión para ver tu diario.</p>
            <SignInButton mode="modal">
              <button className="px-4 py-2 rounded-lg bg-black text-white">
                Iniciar sesión
              </button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="mt-8">
            <textarea
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              placeholder="¿Qué viviste hoy en el Camino?"
              className="w-full border rounded-lg p-3 mb-4"
              rows={4}
            />

            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-black hover:bg-neutral-800 transition text-white rounded-lg"
            >
              Guardar entrada
            </button>

            <div className="mt-8 space-y-4">
              {entries.map((e, index) => (
                <div key={index} className="border rounded-lg p-4">
                  {e}
                </div>
              ))}
            </div>
          </div>
        </SignedIn>
      </div>
    </main>
  )
}
