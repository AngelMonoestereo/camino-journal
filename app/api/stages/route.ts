import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 🔥 1. Buscar ruta del usuario o fallback a oficial
    const userRoute = await prisma.route.findFirst({
      where: { userId, isOfficial: false },
      include: {
        stages: {
          orderBy: { number: 'asc' },
        },
      },
    })

    const route =
      userRoute ??
      (await prisma.route.findFirst({
        where: { isOfficial: true },
        include: {
          stages: {
            orderBy: { number: 'asc' },
          },
        },
      }))

    if (!route) {
      return NextResponse.json([])
    }

    // 🔥 2. Buscar progreso del usuario
    const progress = await prisma.userStageProgress.findMany({
      where: { userId },
    })

    const completedSet = new Set(progress.map((p) => p.stageId))

    // 🔥 3. Merge stages + progress
    const stagesWithProgress = route.stages.map((stage) => ({
      ...stage,
      completed: completedSet.has(stage.id),
    }))

    return NextResponse.json(stagesWithProgress)
  } catch (error) {
    console.error('Error fetching stages:', error)

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

// import { auth } from '@clerk/nextjs/server'
// import { prisma } from '@/lib/prisma'

// export default async function RoutesPage() {
//   const { userId } = auth()

//   const routes = await prisma.route.findMany({
//     where: { isOfficial: true },
//     include: { stages: true },
//   })

//   return (
//     <div className="max-w-2xl mx-auto mt-10 space-y-6">
//       <h1 className="text-3xl font-bold">Elige tu Camino</h1>

//       {routes.map((route) => (
//         <div key={route.id} className="border p-6 rounded-xl shadow-sm space-y-3">
//           <h2 className="text-xl font-semibold">{route.name}</h2>
//           <p>{route.stages.length} etapas</p>

//           <form action="/api/routes/start" method="POST">
//             <input type="hidden" name="routeId" value={route.id} />
//             <button className="bg-black text-white px-4 py-2 rounded">
//               Comenzar
//             </button>
//           </form>
//         </div>
//       ))}
//     </div>
//   )
// }
