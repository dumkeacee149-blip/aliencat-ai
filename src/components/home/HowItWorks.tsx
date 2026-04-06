'use client'

import { motion } from 'framer-motion'

const STEPS = [
  {
    num: '01',
    title: 'Upload Your Face',
    desc: 'Drop a selfie. We scan 468 facial landmarks in real-time to map your bone structure.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="17 8 12 3 7 8"/>
        <line x1="12" y1="3" x2="12" y2="15"/>
      </svg>
    ),
    accent: '#39FF14',
  },
  {
    num: '02',
    title: 'AI Species Analysis',
    desc: 'Your features are cross-referenced with our Galactic Species Database of 6 alien races.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
        <path d="M11 8v6M8 11h6"/>
      </svg>
    ),
    accent: '#00D4FF',
  },
  {
    num: '03',
    title: 'Reveal True Form',
    desc: 'AI reconstructs your alien identity. Share on X and challenge your friends.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
    accent: '#9B59B6',
  },
] as const

export function HowItWorks() {
  return (
    <section className="relative px-6 py-28 overflow-hidden">
      {/* Background accent */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#39FF14]/[0.01] blur-[100px]" />

      <div className="mx-auto max-w-5xl">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 flex items-center justify-center gap-3"
        >
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-white/[0.08]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/20">Process</span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-white/[0.08]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          How It Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 text-center text-[13px] text-white/25"
        >
          Definitely not just a neural network. Definitely uses classified data.
        </motion.p>

        {/* Steps - horizontal cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group card-premium rounded-xl p-6"
            >
              {/* Top row: number + icon */}
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-[11px] text-white/15">{step.num}</span>
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors"
                  style={{
                    backgroundColor: `${step.accent}08`,
                    color: `${step.accent}60`,
                  }}
                >
                  {step.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="mb-2 text-[15px] font-semibold text-white/85">{step.title}</h3>
              <p className="text-[13px] leading-relaxed text-white/30">{step.desc}</p>

              {/* Bottom accent */}
              <div
                className="mt-6 h-px w-full transition-all"
                style={{
                  background: `linear-gradient(90deg, ${step.accent}15, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Connection dots (desktop) */}
        <div className="mt-6 hidden items-center justify-center gap-2 md:flex">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-white/10" />
              {i < 2 && <div className="h-px w-16 bg-white/[0.04]" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
