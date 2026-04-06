'use client'

export function BeforeAfterDemo() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      {/* Blurred background glow from video */}
      <div className="absolute -inset-8 -z-10 overflow-hidden rounded-3xl opacity-40 blur-3xl">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          aria-hidden="true"
        >
          <source src="/videos/hero-demo.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Main video */}
      <div className="relative overflow-hidden rounded-xl border border-white/[0.08] shadow-2xl shadow-black/50">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full"
        >
          <source src="/videos/hero-demo.mp4" type="video/mp4" />
        </video>

        {/* Corner markers */}
        <div className="absolute top-2 left-2 h-4 w-4 border-t border-l border-[#39FF14]/20" />
        <div className="absolute top-2 right-2 h-4 w-4 border-t border-r border-[#39FF14]/20" />
        <div className="absolute bottom-2 left-2 h-4 w-4 border-b border-l border-[#39FF14]/20" />
        <div className="absolute bottom-2 right-2 h-4 w-4 border-b border-r border-[#39FF14]/20" />

        {/* Bottom status bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[#39FF14] status-blink" />
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#39FF14]/40">
              Live Demo
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
