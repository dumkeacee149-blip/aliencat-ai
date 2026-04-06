'use client'

interface ScanLineProps {
  readonly progress: number
  readonly statusText: string
}

export function ScanLine({ progress, statusText }: ScanLineProps) {
  return (
    <div className="w-full space-y-2.5">
      {/* Progress bar */}
      <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/[0.05]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#39FF14] to-[#00D4FF] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-0 h-full w-6 rounded-full bg-[#39FF14]/30 blur-sm transition-all duration-500"
          style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
        />
      </div>

      {/* Status */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] text-[#39FF14]/40">{statusText}</span>
        <span className="font-mono text-[11px] text-white/20">{Math.round(progress)}%</span>
      </div>
    </div>
  )
}
