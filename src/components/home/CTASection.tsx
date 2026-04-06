'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/[0.04] bg-[#0c0c0c]"
      >
        {/* Background effects */}
        <div className="pointer-events-none absolute top-0 left-1/2 h-32 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#39FF14]/[0.04] blur-[60px]" />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />

        <div className="relative flex flex-col items-center gap-8 p-10 sm:p-14 md:flex-row md:gap-12">
          {/* Left: Mascot image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative h-48 w-48 flex-shrink-0 overflow-hidden rounded-2xl border border-white/[0.06] md:h-56 md:w-56"
          >
            <Image
              src="/images/alien-cat-mascot.png"
              alt="Alien Cat mascot"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-2xl border-2 border-[#39FF14]/10 animate-glow" />
          </motion.div>

          {/* Right: CTA text */}
          <div className="text-center md:text-left">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#39FF14]/30">
              Species Detection
            </p>
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Ready to find your species?
            </h2>
            <p className="mb-8 text-[14px] text-white/30">
              Free. Fast. Results may cause existential crisis.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Link
                href="/swap"
                className="group inline-flex items-center gap-2 rounded-lg bg-[#39FF14] px-8 py-3 text-sm font-semibold text-black transition-all hover:shadow-[0_0_40px_rgba(57,255,20,0.15)] animate-glow"
              >
                Scan Your Face Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <a
                href="https://x.com/alienaixyz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-white/[0.08] px-3 py-3 text-white/40 transition-all hover:border-white/[0.15] hover:text-white/60"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
            <p className="mt-5 text-[11px] text-white/15">
              No sign-up required. Your data is not stored.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
