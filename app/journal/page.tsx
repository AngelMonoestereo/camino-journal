'use client'

import { useEffect, useState } from 'react'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

import ProgressTracker from '@/components/progress/ProgressTracker'
import PilgrimStats from '@/components/progress/PilgrimStats'

type JournalEntry = {
  id: string
  content: string
  createdAt: string
  stageId?: string
  stage?: {
    number: number
    from: string
    to: string
  }
}

type Stage = {
  id: string
  number: number
  from: string
  to: string
}

type Progress = {
  totalKm: number
  completedStages: number
}

export default function DashboardPage() {
  const { user, isLoaded, isSignedIn } = useUser()
  const router = useRouter()

  const [entry, setEntry] = useState('')
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [stages, setStages] = useState<Stage[]>([])
  const [selectedStage, setSelectedStage] = useState('')
  const [loading, setLoading] = useState(false)

  const [progress, setProgress] = useState<Progress>({
    totalKm: 0,
    completedStages: 0,
  })

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return

    const fetchData = async () => {
      try {
        // 🥾 Fetch stages
        const stagesRes = await fetch('/api/stages', {
          credentials: 'include',
        })

        if (stagesRes.status === 401) {
          console.log('Not authenticated yet...')
          return
        }

        const stagesData = await stagesRes.json()

        if (!stagesData || stagesData.length === 0) {
          router.push('/routes')
          return
        }

        setStages(stagesData)

        // 📓 Fetch journal entries
        const entriesRes = await fetch('/api/journal', {
          credentials: 'include',
        })
        const entriesData = await entriesRes.json()

        if (Array.isArray(entriesData)) {
          setEntries(entriesData)
        }

        // 📊 Fetch progress
        const progressRes = await fetch('/api/progress', {
          credentials: 'include',
        })
        const progressData = await progressRes.json()

        setProgress(progressData)
      } catch (err) {
        console.error('FETCH ERROR:', err)
      }
    }

    fetchData()
  }, [isLoaded, isSignedIn, router])

  const handleSubmit = async () => {
    if (!entry.trim() || !user) return

    setLoading(true)

    const res = await fetch('/api/journal', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: entry,
        stageId: selectedStage || null,
      }),
    })

    if (res.ok) {
      const savedEntry = await res.json()

      // ✅ agrega entry al UI
      setEntries((prev) => [savedEntry, ...prev])

      // limpiar form
      setEntry('')
      setSelectedStage('')

      // 🔥 ACTUALIZA PROGRESS EN VIVO
      const progressRes = await fetch('/api/progress', {
        credentials: 'include',
      })

      const progressData = await progressRes.json()
      setProgress(progressData)

      // 🚀 OPCIONAL (flow brutal)
      // router.push('/dashboard')
    }

    setLoading(false)
  }

  // 🔥 Loading state mientras Clerk inicializa
  if (!isLoaded) {
    return (
      <main className="min-h-screen p-6">
        <div className="max-w-2xl mx-auto text-center">
          Loading your Camino...
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Mi Camino Journal</h1>
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
          {/* Progress Dashboard */}
          <div className="mt-8 space-y-6">
            <PilgrimStats
              totalKm={progress.totalKm}
              completedStages={progress.completedStages}
            />

            <ProgressTracker totalKm={progress.totalKm} />
          </div>

          {/* Entry Form */}
          <div className="mt-8">
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full border rounded-lg p-3 mb-4"
            >
              <option value="">Selecciona etapa</option>
              {stages.map((stage) => (
                <option key={stage.id} value={stage.id}>
                  {stage.completed ? '✅ ' : ''}
                  Etapa {stage.number}: {stage.from} → {stage.to}
                </option>
              ))}
            </select>

            <textarea
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              placeholder="¿Qué viviste hoy en el Camino?"
              className="w-full border rounded-lg p-3 mb-4"
              rows={4}
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-black hover:bg-neutral-800 transition text-white rounded-lg disabled:opacity-50"
            >
              {loading ? 'Guardando...' : 'Guardar entrada'}
            </button>

            {/* Entries */}
            <div className="mt-8 space-y-4">
              {entries.map((e) => (
                <div
                  key={e.id}
                  className="border border-green-200 bg-green-50 rounded-xl p-5 shadow-sm"
                >
                  {e.stage && (
                    <div className="mb-3 text-sm font-medium text-green-700">
                      🥾 Etapa {e.stage.number}: {e.stage.from} → {e.stage.to}
                    </div>
                  )}

                  <p className="text-neutral-800 leading-relaxed">
                    {e.content}
                  </p>

                  <div className="mt-3 text-xs text-neutral-500">
                    {new Date(e.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SignedIn>
      </div>
    </main>
  )
}

// 'use client'

// import { useEffect, useState } from 'react'
// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
//   useUser,
// } from '@clerk/nextjs'
// import { useRouter } from 'next/navigation'

// import ProgressTracker from '@/components/progress/ProgressTracker'
// import PilgrimStats from '@/components/progress/PilgrimStats'

// type JournalEntry = {
//   id: string
//   content: string
//   createdAt: string
//   stageId?: string
//   stage?: {
//     number: number
//     from: string
//     to: string
//   }
// }

// type Stage = {
//   id: string
//   number: number
//   from: string
//   to: string
// }

// type Progress = {
//   totalKm: number
//   completedStages: number
// }

// export default function DashboardPage() {
//   const { user } = useUser()
//   const router = useRouter()

//   const [entry, setEntry] = useState('')
//   const [entries, setEntries] = useState<JournalEntry[]>([])
//   const [stages, setStages] = useState<Stage[]>([])
//   const [selectedStage, setSelectedStage] = useState('')
//   const [loading, setLoading] = useState(false)

//   const [progress, setProgress] = useState<Progress>({
//     totalKm: 0,
//     completedStages: 0,
//   })

//   useEffect(() => {
//     const fetchData = async () => {
//       // Fetch stages
//       const stagesRes = await fetch('/api/stages')
//       const stagesData = await stagesRes.json()

//       if (!stagesData || stagesData.length === 0) {
//         router.push('/routes')
//         return
//       }

//       setStages(stagesData)

//       // Fetch journal entries
//       const entriesRes = await fetch('/api/journal')
//       const entriesData = await entriesRes.json()

//       if (Array.isArray(entriesData)) {
//         setEntries(entriesData)
//       }

//       // Fetch progress
//       const progressRes = await fetch('/api/progress')
//       const progressData = await progressRes.json()

//       setProgress(progressData)
//     }

//     if (user) {
//       fetchData()
//     }
//   }, [user, router])

//   const handleSubmit = async () => {
//     if (!entry.trim() || !user) return

//     setLoading(true)

//     const res = await fetch('/api/journal', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         content: entry,
//         stageId: selectedStage || null,
//       }),
//     })

//     if (res.ok) {
//       const savedEntry = await res.json()
//       setEntries((prev) => [savedEntry, ...prev])
//       setEntry('')
//       setSelectedStage('')
//     }

//     setLoading(false)
//   }

//   return (
//     <main className="min-h-screen p-6">
//       <div className="max-w-2xl mx-auto">
//         <div className="flex items-center justify-between">
//           <h1 className="text-2xl font-semibold">Mi Camino Journal</h1>
//           <UserButton afterSignOutUrl="/" />
//         </div>

//         <SignedOut>
//           <div className="mt-8 rounded-xl border p-6">
//             <p className="mb-4">Inicia sesión para ver tu diario.</p>
//             <SignInButton mode="modal">
//               <button className="px-4 py-2 rounded-lg bg-black text-white">
//                 Iniciar sesión
//               </button>
//             </SignInButton>
//           </div>
//         </SignedOut>

//         <SignedIn>
//           {/* Progress Dashboard */}
//           <div className="mt-8 space-y-6">
//             <PilgrimStats
//               totalKm={progress.totalKm}
//               completedStages={progress.completedStages}
//             />

//             <ProgressTracker totalKm={progress.totalKm} />
//           </div>

//           {/* Entry Form */}
//           <div className="mt-8">
//             <select
//               value={selectedStage}
//               onChange={(e) => setSelectedStage(e.target.value)}
//               className="w-full border rounded-lg p-3 mb-4"
//             >
//               <option value="">Selecciona etapa</option>
//               {stages.map((stage) => (
//                 <option key={stage.id} value={stage.id}>
//                   Etapa {stage.number}: {stage.from} → {stage.to}
//                 </option>
//               ))}
//             </select>

//             <textarea
//               value={entry}
//               onChange={(e) => setEntry(e.target.value)}
//               placeholder="¿Qué viviste hoy en el Camino?"
//               className="w-full border rounded-lg p-3 mb-4"
//               rows={4}
//             />

//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="px-4 py-2 bg-black hover:bg-neutral-800 transition text-white rounded-lg disabled:opacity-50"
//             >
//               {loading ? 'Guardando...' : 'Guardar entrada'}
//             </button>

//             {/* Entries */}
//             <div className="mt-8 space-y-4">
//               {entries.map((e) => (
//                 <div
//                   key={e.id}
//                   className="border border-green-200 bg-green-50 rounded-xl p-5 shadow-sm"
//                 >
//                   {e.stage && (
//                     <div className="mb-3 text-sm font-medium text-green-700">
//                       🥾 Etapa {e.stage.number}: {e.stage.from} → {e.stage.to}
//                     </div>
//                   )}

//                   <p className="text-neutral-800 leading-relaxed">
//                     {e.content}
//                   </p>

//                   <div className="mt-3 text-xs text-neutral-500">
//                     {new Date(e.createdAt).toLocaleString()}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </SignedIn>
//       </div>
//     </main>
//   )
// }
