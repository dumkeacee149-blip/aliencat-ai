'use client'

import { motion } from 'framer-motion'
import { GlitchText } from '@/components/ui/GlitchText'
import { BeforeAfterDemo } from '@/components/home/BeforeAfterDemo'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-14">
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid" />

      {/* Radial glow spots */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#39FF14]/[0.02] blur-[100px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-[#00D4FF]/[0.015] blur-[80px]" />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-16 lg:flex-row lg:gap-12">
        {/* Left: Text content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#39FF14] status-blink" />
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">
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
              className="text-4xl font-black tracking-tighter text-white sm:text-5xl lg:text-6xl"
            />
            <GlitchText
              text="TRUE FORM"
              className="text-4xl font-black tracking-tighter text-gradient sm:text-5xl lg:text-6xl"
              as="h1"
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-5 max-w-md text-base leading-relaxed text-white/40 lg:text-lg"
          >
            AI that transforms any selfie into your alien form.
            Upload your face — discover your species in 30 seconds.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-3 font-mono text-[12px] text-[#39FF14]/30"
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
              className="group relative flex items-center gap-2 rounded-lg bg-[#39FF14] px-7 py-3 text-sm font-semibold text-black transition-all hover:shadow-[0_0_40px_rgba(57,255,20,0.2)] animate-glow"
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
              className="flex items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-3 text-white/45 transition-all hover:border-white/[0.15] hover:text-white/65"
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
            className="mt-12 flex items-center gap-px rounded-lg border border-white/[0.04] bg-white/[0.015] overflow-hidden w-fit mx-auto lg:mx-0"
          >
            {[
              { value: '10,000+', label: 'Faces Scanned' },
              { value: '47%', label: 'Not Human' },
              { value: '6', label: 'Species' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`px-5 py-3 text-center ${i > 0 ? 'border-l border-white/[0.04]' : ''}`}
              >
                <div className="font-mono text-sm font-semibold text-white/80">{stat.value}</div>
                <div className="font-mono text-[9px] uppercase tracking-wider text-white/20">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Before/After demo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full max-w-sm flex-shrink-0 lg:max-w-md"
        >
          <BeforeAfterDemo />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-6 flex flex-col items-center gap-1"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/10">Scroll</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/10 animate-bounce">
          <path d="M7 13l5 5 5-5" />
        </svg>
      </motion.div>
    </section>
  )
}
