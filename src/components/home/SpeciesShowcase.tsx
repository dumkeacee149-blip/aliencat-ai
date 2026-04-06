'use client'

import { motion } from 'framer-motion'
import { SPECIES_LIST } from '@/lib/species'

export function SpeciesShowcase() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-center text-3xl font-bold text-white sm:text-4xl"
        >
          6 Species Identified
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-center text-white/50"
        >
          Which one are you?
        </motion.p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SPECIES_LIST.map((species, i) => (
            <motion.div
              key={species.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group cursor-pointer rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-[#39FF14]/30 hover:bg-[#39FF14]/5"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="text-3xl">{species.emoji}</span>
                <div>
                  <h3 className="font-bold text-white">{species.name}</h3>
                  <div
                    className="h-1 w-8 rounded-full transition-all group-hover:w-16"
                    style={{ backgroundColor: species.color }}
                  />
                </div>
              </div>
              <p className="mb-3 text-sm text-white/60">{species.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {species.traits.map((trait) => (
                  <span
                    key={trait}
                    className="rounded-full px-2 py-0.5 text-xs"
                    style={{
                      backgroundColor: `${species.color}15`,
                      color: `${species.color}CC`,
                    }}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
