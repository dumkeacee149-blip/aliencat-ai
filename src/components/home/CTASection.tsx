'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="px-4 py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mx-auto max-w-2xl rounded-2xl border border-[#39FF14]/20 bg-gradient-to-b from-[#39FF14]/10 to-transparent p-12 text-center"
      >
        <div className="mb-4 text-5xl">🛸</div>
        <h2 className="mb-3 text-3xl font-bold text-white">
          Ready to find your species?
        </h2>
        <p className="mb-8 text-white/50">
          Free. Fast. Results may cause existential crisis.
        </p>
        <Link
          href="/swap"
          className="inline-block rounded-xl bg-[#39FF14] px-10 py-4 text-lg font-bold text-black transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(57,255,20,0.3)]"
        >
          Scan Your Face Now
        </Link>
        <p className="mt-4 text-xs text-white/30">
          No sign-up required. Your data is not stored.
        </p>
      </motion.div>
    </section>
  )
}
