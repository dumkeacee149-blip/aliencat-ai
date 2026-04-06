'use client'

import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'

export function BeforeAfterDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPosition((x / rect.width) * 100)
  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true)
    updatePosition(e.clientX)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [updatePosition])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return
    updatePosition(e.clientX)
  }, [isDragging, updatePosition])

  const handlePointerUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  return (
    <div className="relative mx-auto w-full max-w-sm">
      {/* Label */}
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/20">Human</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#39FF14]/30">True Form</span>
      </div>

      {/* Slider container */}
      <div
        ref={containerRef}
        className="before-after-slider aspect-[4/5] w-full rounded-xl border border-white/[0.06] overflow-hidden"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* After (alien) - full background */}
        <div className="absolute inset-0">
          <Image
            src="/images/before-after-collage.png"
            alt="Alien face swap results"
            fill
            className="object-cover"
            priority
          />
          {/* Scan overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="font-mono text-[10px] text-[#39FF14]/60">SPECIES DETECTED</div>
            <div className="font-mono text-[9px] text-[#39FF14]/30 mt-1">MATCH: 94.7%</div>
          </div>
        </div>

        {/* Before (human) - clipped overlay */}
        <div
          className="overlay"
          style={{ width: `${position}%` }}
        >
          <div className="relative h-full" style={{ width: containerRef.current?.offsetWidth ?? 400 }}>
            <Image
              src="/images/alien-cat-mascot.png"
              alt="Original human photo"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
            <div className="absolute bottom-4 left-4">
              <div className="font-mono text-[10px] text-white/40">SUBJECT: SCANNING...</div>
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div className="divider" style={{ left: `${position}%`, transform: 'translateX(-50%)' }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="2">
              <path d="M8 3l-5 9 5 9M16 3l5 9-5 9"/>
            </svg>
          </div>
        </div>

        {/* Corner markers */}
        <div className="absolute top-2 left-2 h-4 w-4 border-t border-l border-[#39FF14]/20" />
        <div className="absolute top-2 right-2 h-4 w-4 border-t border-r border-[#39FF14]/20" />
        <div className="absolute bottom-2 left-2 h-4 w-4 border-b border-l border-[#39FF14]/20" />
        <div className="absolute bottom-2 right-2 h-4 w-4 border-b border-r border-[#39FF14]/20" />
      </div>

      {/* Instruction */}
      <p className="mt-3 text-center font-mono text-[10px] text-white/15 uppercase tracking-widest">
        Drag to compare
      </p>
    </div>
  )
}
