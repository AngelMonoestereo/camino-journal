type MoodSelectorProps = {
  mood: string
  onChange: (value: string) => void
}

const moods = ['Bien', 'Cansado', 'Encabronado', 'Agradecido']

export default function MoodSelector({ mood, onChange }: MoodSelectorProps) {
  return (
    <section className="border border-[#c9c0b3] rounded-2xl p-5 bg-[#fbf8f1]">
      <h2 className="text-2xl font-serif mb-3">¿Cómo te sentiste hoy?</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {moods.map((item) => (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`border rounded-2xl p-4 ${
              mood === item
                ? 'border-[#2d2a26] bg-[#2d2a26] text-white'
                : 'border-[#c9c0b3]'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {mood && (
        <p className="mt-3 text-xs text-[#6f6a61]">Estado guardado: {mood}</p>
      )}
    </section>
  )
}
