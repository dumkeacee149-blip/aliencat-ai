'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function CinematicBreak() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Radial glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#39FF14]/[0.03] blur-[100px]" />

      <div className="mx-auto max-w-4xl px-6">
        <div className="flex flex-col items-center gap-10 md:flex-row md:gap-14">
          {/* Mascot image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative h-48 w-48 flex-shrink-0 overflow-hidden rounded-2xl border border-[#39FF14]/10 md:h-56 md:w-56"
          >
            <Image
              src="/images/alien-cat-mascot.png"
              alt="Alien Cat mascot"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute top-2 left-2 h-4 w-4 border-t border-l border-[#39FF14]/30" />
            <div className="absolute top-2 right-2 h-4 w-4 border-t border-r border-[#39FF14]/30" />
            <div className="absolute bottom-2 left-2 h-4 w-4 border-b border-l border-[#39FF14]/30" />
            <div className="absolute bottom-2 right-2 h-4 w-4 border-b border-r border-[#39FF14]/30" />
          </motion.div>

          {/* Text */}
          <div className="text-center md:text-left">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#39FF14]/30"
            >
              System Alert
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-3 text-2xl font-bold tracking-tight text-white/80 sm:text-3xl lg:text-4xl"
            >
              The AI doesn&apos;t create your alien form.
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-3 text-lg font-light text-[#39FF14]/50 sm:text-xl"
            >
              It reveals it.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-4 max-w-md text-[13px] leading-relaxed text-white/25"
            >
              Our neural network analyzes 468 facial landmarks and cross-references them with the Galactic Species Database. The match was always there.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Scan lines */}
      <div className="pointer-events-none absolute inset-0" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(57,255,20,0.015) 3px, rgba(57,255,20,0.015) 4px)',
      }} />
    </section>
  )
}
