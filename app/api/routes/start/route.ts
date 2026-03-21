import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const user = await currentUser()

    if (!user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const formData = await req.formData()
    const routeId = formData.get('routeId') as string

    if (!routeId) {
      return new Response('Missing routeId', { status: 400 })
    }

    // ✅ Asegurar que el user existe en DB
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
      },
    })

    // 🔎 Verificar si ya tiene una ruta activa
    const existing = await prisma.route.findFirst({
      where: { userId: user.id, isOfficial: false },
    })

    if (existing) {
      return Response.redirect(new URL('/journal', req.url))
    }

    // 🔎 Buscar ruta oficial
    const official = await prisma.route.findUnique({
      where: { id: routeId },
      include: { stages: true },
    })

    if (!official) {
      return new Response('Not found', { status: 404 })
    }

    // 🆕 Crear nueva ruta personalizada
    const newRoute = await prisma.route.create({
      data: {
        name: official.name,
        isOfficial: false,
        userId: user.id, // ✅ ahora sí válido
      },
    })

    // 🥾 Clonar etapas
    await prisma.stage.createMany({
      data: official.stages.map((stage) => ({
        number: stage.number,
        title: stage.title,
        from: stage.from,
        to: stage.to,
        distanceKm: stage.distanceKm,
        elevation: stage.elevation,
        routeId: newRoute.id,
      })),
    })

    return Response.redirect(new URL('/journal', req.url))
  } catch (error) {
    console.error('START ROUTE ERROR:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
