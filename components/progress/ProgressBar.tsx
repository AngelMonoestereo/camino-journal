interface ProgressBarProps {
  percentage: number
}

export default function ProgressBar({ percentage }: ProgressBarProps) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
      <div
        className="bg-blue-600 h-4 transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}
