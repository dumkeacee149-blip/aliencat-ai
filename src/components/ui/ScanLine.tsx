'use client'

interface ScanLineProps {
  readonly progress: number
  readonly statusText: string
}

export function ScanLine({ progress, statusText }: ScanLineProps) {
  return (
    <div className="w-full space-y-3">
      {/* Progress bar */}
      <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#39FF14] to-[#00D4FF] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
        {/* Scanning glow */}
        <div
          className="absolute top-0 h-full w-8 rounded-full bg-[#39FF14]/50 blur-sm transition-all duration-500"
          style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
        />
      </div>

      {/* Status text */}
      <div className="flex items-center justify-between text-sm">
        <span className="font-mono text-[#39FF14]/80">{statusText}</span>
        <span className="font-mono text-white/40">{Math.round(progress)}%</span>
      </div>
    </div>
  )
}
