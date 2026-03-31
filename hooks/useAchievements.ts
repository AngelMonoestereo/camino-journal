import { useEffect, useState } from 'react'
import { achievementsList } from '../lib/achievements'

export function useAchievements(progressData) {
  const [unlocked, setUnlocked] = useState<string[]>([])

  useEffect(() => {
    const newUnlocks: string[] = []

    achievementsList.forEach((a) => {
      if (a.check(progressData) && !unlocked.includes(a.id)) {
        newUnlocks.push(a.id)
      }
    })

    if (newUnlocks.length) {
      setUnlocked((prev) => [...prev, ...newUnlocks])
    }
  }, [progressData])

  return unlocked
}
