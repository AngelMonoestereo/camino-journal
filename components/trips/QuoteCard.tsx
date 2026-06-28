type QuoteCardProps = {
  value: string
  onChange: (value: string) => void
}

export default function QuoteCard({ value, onChange }: QuoteCardProps) {
  return (
    <section className="border border-[#c9c0b3] rounded-2xl p-5 bg-[#fbf8f1]">
      <h2 className="text-2xl font-serif mb-3">🌅 Frase final del día</h2>

      <input
        className="w-full border border-[#c9c0b3] rounded-xl p-3 bg-transparent"
        placeholder="Una frase para recordar este día..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {value && <p className="mt-3 text-sm italic text-[#6f6a61]">“{value}”</p>}
    </section>
  )
}
