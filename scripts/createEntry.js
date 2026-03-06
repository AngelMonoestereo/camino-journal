import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const stage = await prisma.stage.findFirst()

  if (!stage) {
    console.log('No stage found')
    return
  }

  const entry = await prisma.journalEntry.create({
    data: {
      content: 'Crossing the Pyrenees. Brutal but beautiful.',
      mood: 9,
      energy: 6,
      beers: 2,
      wine: 0,
      coffee: 1,
      expenses: 34,
      peopleMet: 3,
      userId: 'dev-user-1',
      stageId: stage.id,
    },
  })

  console.log('Entry created:', entry.id)
}

main()
