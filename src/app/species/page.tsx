'use client'

import { motion } from 'framer-motion'
import { SPECIES_LIST } from '@/lib/species'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'

export default function SpeciesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-12">
        <div className="mx-auto max-w-4xl px-4">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-3 text-4xl font-bold text-white">
              Galactic Species Database
            </h1>
            <p className="text-white/50">
              6 species identified so far. Classification level: OMEGA.
            </p>
            <p className="mt-1 text-xs text-[#39FF14]/50">
              CLEARANCE: PUBLIC (declassified April 2026)
            </p>
          </div>

          {/* Species grid */}
          <div className="space-y-6">
            {SPECIES_LIST.map((species, i) => (
              <motion.div
                key={species.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  {/* Species icon */}
                  <div
                    className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-xl text-4xl"
                    style={{ backgroundColor: `${species.color}15` }}
                  >
                    {species.emoji}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-white">{species.name}</h2>
                      <div
                        className="h-2 w-2 rounded-full animate-pulse"
                        style={{ backgroundColor: species.color }}
                      />
                    </div>
                    <p className="mb-3 text-white/60">{species.description}</p>

                    {/* Traits */}
                    <div className="mb-3 flex flex-wrap gap-2">
                      {species.traits.map((trait) => (
                        <span
                          key={trait}
                          className="rounded-full border px-3 py-1 text-xs"
                          style={{
                            borderColor: `${species.color}30`,
                            color: species.color,
                          }}
                        >
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
          <div className="mt-12 text-center">
            <p className="mb-4 text-white/40">Which species are you?</p>
            <Link
              href="/swap"
              className="inline-block rounded-xl bg-[#39FF14] px-8 py-3 font-bold text-black transition hover:scale-105"
            >
              Find Out Now
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
