'use client'

import { motion } from 'framer-motion'
import { SPECIES_LIST } from '@/lib/species'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'

export default function SpeciesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-12">
        <div className="mx-auto max-w-4xl px-6">
          {/* Header */}
          <div className="mb-10 text-center">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#39FF14]/30">
              Classification Level: Omega
            </p>
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Galactic Species Database
            </h1>
            <p className="text-[13px] text-white/25">
              6 species identified so far. Declassified April 2026.
            </p>
          </div>

          {/* Species selection banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-10 overflow-hidden rounded-xl border border-white/[0.06]"
          >
            <div className="relative aspect-[16/8] w-full">
              <Image
                src="/images/species-selection.png"
                alt="Species selection interface"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </motion.div>

          {/* Species list */}
          <div className="space-y-3">
            {SPECIES_LIST.map((species, i) => (
              <motion.div
                key={species.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="card-premium rounded-xl p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  {/* Species indicator */}
                  <div
                    className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${species.color}08` }}
                  >
                    <div className="h-4 w-4 rounded-full status-blink" style={{ backgroundColor: species.color }} />
                  </div>

                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-3">
                      <h2 className="text-lg font-semibold text-white/85">{species.name}</h2>
                      <div className="h-[2px] w-6 rounded-full" style={{ backgroundColor: `${species.color}30` }} />
                    </div>
                    <p className="mb-3 text-[13px] leading-relaxed text-white/30">{species.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {species.traits.map((trait) => (
                        <span key={trait} className="rounded-md px-2.5 py-1 text-[10px] font-medium" style={{ backgroundColor: `${species.color}08`, color: `${species.color}80` }}>
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 text-center">
            <p className="mb-4 text-[13px] text-white/20">Which species are you?</p>
            <Link
              href="/swap"
              className="group inline-flex items-center gap-2 rounded-lg bg-[#39FF14] px-7 py-3 text-sm font-semibold text-black transition hover:shadow-[0_0_40px_rgba(57,255,20,0.15)]"
            >
              Find Out Now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
