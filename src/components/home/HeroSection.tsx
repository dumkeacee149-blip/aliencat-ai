'use client'

import { motion } from 'framer-motion'
import { GlitchText } from '@/components/ui/GlitchText'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-14 overflow-hidden">
      {/* Video background — poster shows instantly, video loads after */}
      <div className="absolute inset-0 -z-20 scale-110">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-poster.jpg"
          preload="auto"
          className="h-full w-full object-cover blur-[2px]"
        >
          {/* Smaller file for mobile, full quality for desktop */}
          <source src="/videos/hero-demo-sm.mp4" type="video/mp4" media="(max-width: 768px)" />
          <source src="/videos/hero-demo.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Layered overlays for depth */}
      {/* Base darkening */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-black/50" />
      {/* Left-side heavy gradient so text area is dark & clean */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      {/* Top & bottom fade to site background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-[#0a0a0f] via-transparent to-[#0a0a0f]/70" />
      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0 -z-10" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)',
      }} />

      {/* Scan line overlay for sci-fi feel */}
      <div className="pointer-events-none absolute inset-0 -z-[5] opacity-[0.03]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(57,255,20,0.4) 2px, rgba(57,255,20,0.4) 3px)',
      }} />

      {/* Radial glow spots */}
      <div className="pointer-events-none absolute top-1/3 left-1/4 h-[400px] w-[400px] rounded-full bg-[#39FF14]/[0.03] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/3 right-1/3 h-[300px] w-[300px] rounded-full bg-[#00D4FF]/[0.02] blur-[100px]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-16 lg:flex-row lg:gap-12">
        {/* Left: Text content — on dark gradient side */}
        <div className="flex-1 text-center lg:text-left">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#39FF14]/10 bg-[#39FF14]/[0.03] px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#39FF14] status-blink" />
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#39FF14]/50">
              AI Species Detection Active
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            <GlitchText
              text="REVEAL YOUR"
              className="text-4xl font-black tracking-tighter text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)] sm:text-5xl lg:text-7xl"
            />
            <GlitchText
              text="TRUE FORM"
              className="text-4xl font-black tracking-tighter text-gradient drop-shadow-[0_2px_30px_rgba(57,255,20,0.15)] sm:text-5xl lg:text-7xl"
              as="h1"
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-white/50 lg:text-lg"
          >
            AI that transforms any selfie into your alien form.
            Upload your face — discover your species in 30 seconds.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-3 font-mono text-[12px] text-[#39FF14]/40"
          >
            ran an AI on 10,000 faces. 47% weren&apos;t human.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            <Link
              href="/swap"
              className="group relative flex items-center gap-2 rounded-lg bg-[#39FF14] px-7 py-3.5 text-sm font-semibold text-black transition-all hover:shadow-[0_0_50px_rgba(57,255,20,0.3)] animate-glow"
            >
              Scan Your Face
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>

            <a
              href="https://x.com/alienaixyz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.04] px-3.5 py-3.5 text-white/50 backdrop-blur-sm transition-all hover:border-white/[0.2] hover:text-white/70"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 flex items-center gap-px rounded-lg border border-white/[0.06] bg-black/30 overflow-hidden w-fit mx-auto lg:mx-0 backdrop-blur-md"
          >
            {[
              { value: '10,000+', label: 'Faces Scanned' },
              { value: '47%', label: 'Not Human' },
              { value: '6', label: 'Species' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`px-5 py-3 text-center ${i > 0 ? 'border-l border-white/[0.06]' : ''}`}
              >
                <div className="font-mono text-sm font-semibold text-white/90">{stat.value}</div>
                <div className="font-mono text-[9px] uppercase tracking-wider text-white/30">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: empty space lets the video show through */}
        <div className="hidden flex-1 lg:block" />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-6 flex flex-col items-center gap-1"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/15">Scroll</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/15 animate-bounce">
          <path d="M7 13l5 5 5-5" />
        </svg>
      </motion.div>
    </section>
  )
}
