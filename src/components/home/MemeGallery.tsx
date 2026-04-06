'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const MEMES = [
  {
    src: '/images/chief-alien-officer.png',
    title: 'Chief Alien Officer',
    caption: 'When you run the biggest exchange but you\'re actually a Grey',
  },
  {
    src: '/images/disclosure-meme.png',
    title: 'Disclosure',
    caption: '"if the public knew what I know..." — sir we already know',
  },
  {
    src: '/images/conspiracy-board.png',
    title: 'The Evidence',
    caption: 'What does "4" really mean? We connected the dots.',
  },
  {
    src: '/images/species-report.png',
    title: 'Classified Report',
    caption: 'CONFIDENTIAL: Crypto industry alien species infiltration analysis',
  },
  {
    src: '/images/binance-parody.png',
    title: 'New Listing',
    caption: 'Asset: YOUR TRUE FORM. Trading pair: HUMAN/ALIEN.',
  },
  {
    src: '/images/species-selection.png',
    title: 'Species Database',
    caption: 'Project Genesis: Alien Hybridization Protocol - Subject Selection',
  },
] as const

export function MemeGallery() {
  return (
    <section className="relative px-6 py-28 overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/4 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#00D4FF]/[0.01] blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-white/[0.08]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/20">Intel</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-white/[0.08]" />
          </div>
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Declassified Evidence
          </h2>
          <p className="text-[13px] text-white/25">
            They didn&apos;t want you to see this.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MEMES.map((meme, i) => (
            <motion.div
              key={meme.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="group card-premium overflow-hidden rounded-xl"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={meme.src}
                  alt={meme.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute top-3 left-3 h-5 w-5 border-t border-l border-[#39FF14]/0 transition-all duration-300 group-hover:border-[#39FF14]/40" />
                <div className="absolute top-3 right-3 h-5 w-5 border-t border-r border-[#39FF14]/0 transition-all duration-300 group-hover:border-[#39FF14]/40" />
                <div className="absolute bottom-3 left-3 h-5 w-5 border-b border-l border-[#39FF14]/0 transition-all duration-300 group-hover:border-[#39FF14]/40" />
                <div className="absolute bottom-3 right-3 h-5 w-5 border-b border-r border-[#39FF14]/0 transition-all duration-300 group-hover:border-[#39FF14]/40" />
              </div>
              <div className="p-4">
                <h3 className="mb-1 text-sm font-semibold text-white/70">{meme.title}</h3>
                <p className="text-[12px] leading-relaxed text-white/25">{meme.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
