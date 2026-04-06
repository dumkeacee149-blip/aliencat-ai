'use client'

import { motion } from 'framer-motion'
import { GlitchText } from '@/components/ui/GlitchText'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
      {/* Alien cat badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-6xl"
      >
        🐱👽
      </motion.div>

      {/* Main headline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <GlitchText
          text="REVEAL YOUR TRUE FORM"
          className="mb-4 text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl"
        />
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mb-2 max-w-xl text-lg text-white/60 sm:text-xl"
      >
        AI that transforms any selfie into your alien form.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mb-8 text-sm text-[#39FF14]/60"
      >
        ran an AI on 10,000 faces. 47% weren&apos;t human. you should probably check.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex gap-4"
      >
        <Link
          href="/swap"
          className="group relative overflow-hidden rounded-xl bg-[#39FF14] px-8 py-4 text-lg font-bold text-black transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(57,255,20,0.3)]"
        >
          {/* Pulse glow */}
          <span className="absolute inset-0 animate-pulse rounded-xl bg-[#39FF14]/30 blur-xl" />
          <span className="relative">Scan Your Face</span>
        </Link>

        <a
          href="https://x.com/aliencat_ai"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-white/20 px-8 py-4 text-lg font-medium text-white/80 transition-all hover:border-[#39FF14]/50 hover:text-white"
        >
          Follow @aliencat_ai
        </a>
      </motion.div>

      {/* Stats ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="mt-16 flex gap-8 text-center"
      >
        {[
          { value: '10,000+', label: 'Faces Scanned' },
          { value: '47%', label: 'Not Human' },
          { value: '6', label: 'Species Found' },
        ].map((stat) => (
          <div key={stat.label}>
            <div className="text-2xl font-bold text-[#39FF14]">{stat.value}</div>
            <div className="text-xs text-white/40">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 animate-bounce text-white/30"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </motion.div>
    </section>
  )
}
