type DayHeaderProps = {
  day: string
  route: string
  subtitle: string
}

export default function DayHeader({ day, route, subtitle }: DayHeaderProps) {
  return (
    <>
      <p className="uppercase tracking-[0.3em] text-xs mt-8 mb-3">{day}</p>

      <h1 className="text-4xl font-serif mb-2">{route}</h1>

      <p className="text-sm text-[#6f6a61] mb-8">{subtitle}</p>
    </>
  )
}
