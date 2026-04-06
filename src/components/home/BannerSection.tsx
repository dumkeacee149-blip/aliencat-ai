'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function BannerSection() {
  return (
    <section className="relative px-6 py-20 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="group relative overflow-hidden rounded-2xl border border-white/[0.04]"
        >
          <div className="relative aspect-[21/9] w-full overflow-hidden">
            <Image
              src="/images/last-supper-banner.png"
              alt="The Last Supper - Alien Cat edition"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

            {/* Scan line on hover */}
            <div className="absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#39FF14]/30 to-transparent animate-scan" />
            </div>
          </div>

          {/* Text overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#39FF14]/40"
            >
              Intercepted Transmission
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl font-bold text-white/80 sm:text-2xl lg:text-3xl"
            >
              The Last Supper, but they were never human.
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-2 max-w-lg text-[13px] text-white/30"
            >
              13 species. One table. Zero breadsticks that aren&apos;t genetically modified by the Greys.
            </motion.p>
          </div>

          {/* Corner markers */}
          <div className="absolute top-4 left-4 h-6 w-6 border-t-2 border-l-2 border-[#39FF14]/20" />
          <div className="absolute top-4 right-4 h-6 w-6 border-t-2 border-r-2 border-[#39FF14]/20" />
          <div className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-[#39FF14]/20" />
          <div className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-[#39FF14]/20" />
        </motion.div>
      </div>
    </section>
  )
}
