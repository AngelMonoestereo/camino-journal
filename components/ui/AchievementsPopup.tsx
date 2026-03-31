import { achievementsList } from '@/lib/achievements'

export default function AchievementsPopup({
  unlocked,
}: {
  unlocked: string[]
}) {
  return (
    <>
      {unlocked.map((id) => {
        const a = achievementsList.find((x) => x.id === id)

        return (
          <div
            key={id}
            className="fixed bottom-5 right-5 bg-black text-white p-4 rounded-xl shadow-xl animate-bounce"
          >
            <div className="text-xl">{a?.icon}</div>
            <div className="font-bold">{a?.title}</div>
            <div className="text-sm opacity-70">{a?.description}</div>
          </div>
        )
      })}
    </>
  )
}
