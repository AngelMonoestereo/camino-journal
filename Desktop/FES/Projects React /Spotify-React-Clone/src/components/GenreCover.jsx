const MAP = {
  lounge: { emoji: "🍹", from: "#3B2F2F", to: "#1E1E1E" },
  jazz: { emoji: "🎷", from: "#2F2536", to: "#0B0B0B" },
  blues: { emoji: "🎸", from: "#1F2A44", to: "#0E1626" },
  salsa: { emoji: "🕺", from: "#5C2A2A", to: "#1E1E1E" },
  firepit: { emoji: "🔥", from: "#402A1E", to: "#0F0B07" },
  coffeehouse: { emoji: "☕", from: "#3B2F2F", to: "#1E1E1E" },
  default: { emoji: "🎶", from: "#3B2F2F", to: "#1E1E1E" },
};

export default function GenreCover({ label = "Music", tag = "default" }) {
  const m = MAP[tag] || MAP.default;
  return (
    <div
      className="w-full h-44 rounded flex items-center justify-center border border-charcoalBlack/40"
      style={{ background: `linear-gradient(135deg, ${m.from}, ${m.to})` }}
    >
      <div className="text-center px-3">
        <div className="text-3xl mb-1">{m.emoji}</div>
        <p className="font-heading text-goldenHoney text-sm leading-tight">
          {label}
        </p>
      </div>
    </div>
  );
}
