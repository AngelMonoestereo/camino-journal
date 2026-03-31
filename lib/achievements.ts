export type Achievement = {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  check: (data: {
    completedStages: number
    totalStages: number
    currentStageNumber: number
  }) => boolean
}

export const achievementsList: Achievement[] = [
  {
    id: 'pyrenees',
    title: 'Pirineos conquistados',
    description: 'Cruzaste los Pirineos. Ya no hay vuelta atrás.',
    icon: '🏔️',
    unlocked: false,
    check: ({ completedStages }) => completedStages >= 1,
  },
  {
    id: 'pamplona',
    title: 'Sobreviviste Pamplona',
    description: 'No te corrió ningún toro… pero casi.',
    icon: '🐂',
    unlocked: false,
    check: ({ currentStageNumber }) => currentStageNumber >= 3,
  },
  {
    id: 'perdon',
    title: 'Perdón recibido',
    description: 'El viento y el alma se cruzaron.',
    icon: '✝️',
    unlocked: false,
    check: ({ currentStageNumber }) => currentStageNumber >= 4,
  },
  {
    id: '100km',
    title: 'Ya eres peregrino',
    description: 'Has caminado 100km.',
    icon: '🥾',
    unlocked: false,
    check: ({ completedStages }) => completedStages >= 5,
  },
]
