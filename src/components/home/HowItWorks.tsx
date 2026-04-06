'use client'

import { motion } from 'framer-motion'

const STEPS = [
  {
    num: '01',
    title: 'Upload Your Face',
    desc: 'Drop a selfie. We scan 468 facial landmarks.',
    icon: '📸',
  },
  {
    num: '02',
    title: 'AI Species Analysis',
    desc: 'Cross-referenced with the Galactic Species Database.',
    icon: '🧬',
  },
  {
    num: '03',
    title: 'Reveal True Form',
    desc: 'Your alien identity reconstructed in 30 seconds.',
    icon: '👽',
  },
] as const

export function HowItWorks() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-center text-3xl font-bold text-white sm:text-4xl"
        >
          How It Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 text-center text-sm text-white/40"
        >
          (definitely not just a neural network. definitely uses classified data.)
        </motion.p>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-[#39FF14]/0 via-[#39FF14]/30 to-[#39FF14]/0 sm:block" />

          <div className="space-y-12 sm:space-y-16">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className={`flex items-center gap-8 ${
                  i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                } flex-col`}
              >
                <div className="flex-1 text-center sm:text-left">
                  <span className="font-mono text-sm text-[#39FF14]/60">{step.num}</span>
                  <h3 className="mt-1 text-xl font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-white/50">{step.desc}</p>
                </div>

                {/* Center icon */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-[#39FF14]/30 bg-[#39FF14]/10 text-3xl">
                  {step.icon}
                  {/* Pulse ring */}
                  <span className="absolute inset-0 animate-ping rounded-full border border-[#39FF14]/20" />
                </div>

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
