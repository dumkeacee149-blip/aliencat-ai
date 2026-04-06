'use client'

import { motion } from 'framer-motion'
import { SPECIES_LIST } from '@/lib/species'

/** SVG icon per species — replaces emojis with proper visual identity */
function SpeciesIcon({ id, color }: { id: string; color: string }) {
  const iconStyle = { stroke: color, strokeWidth: 1.5, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

  switch (id) {
    case 'grey':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" {...iconStyle}>
          <ellipse cx="12" cy="10" rx="7" ry="9"/><ellipse cx="9" cy="9" rx="2" ry="1.2"/><ellipse cx="15" cy="9" rx="2" ry="1.2"/>
        </svg>
      )
    case 'reptilian':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" {...iconStyle}>
          <path d="M12 2C8 2 4 6 4 12s4 10 8 10c2 0 4-2 4-5"/><circle cx="9" cy="9" r="1.5"/><path d="M20 8c-2 0-4 2-4 4s2 4 4 4"/>
        </svg>
      )
    case 'nordic':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" {...iconStyle}>
          <circle cx="12" cy="10" r="7"/><path d="M8 9h2M14 9h2"/><path d="M12 17v4M8 21h8"/><path d="M5 3l3 4M19 3l-3 4"/>
        </svg>
      )
    case 'insectoid':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" {...iconStyle}>
          <ellipse cx="12" cy="12" rx="5" ry="7"/><circle cx="9" cy="10" r="2"/><circle cx="15" cy="10" r="2"/><path d="M7 5l-3-3M17 5l3-3M7 19l-3 3M17 19l3 3"/>
        </svg>
      )
    case 'shadow':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" {...iconStyle}>
          <path d="M12 2a10 10 0 0 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 2a6 6 0 0 1 0 20" opacity="0.3"/>
        </svg>
      )
    case 'feline':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" {...iconStyle}>
          <path d="M12 22C7 22 3 18 3 13V4l4 3h10l4-3v9c0 5-4 9-9 9z"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><path d="M10 16h4"/>
        </svg>
      )
    default:
      return <div className="h-6 w-6 rounded-full" style={{ backgroundColor: color }} />
  }
}

export function SpeciesShowcase() {
  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 flex items-center justify-center gap-3"
        >
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-white/[0.08]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/20">Database</span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-white/[0.08]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          6 Species Identified
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-14 text-center text-[13px] text-white/25"
        >
          Which one are you?
        </motion.p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SPECIES_LIST.map((species, i) => (
            <motion.div
              key={species.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group card-premium cursor-pointer rounded-xl p-5"
            >
              <div className="mb-4 flex items-center gap-3">
                {/* Species icon */}
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors"
                  style={{ backgroundColor: `${species.color}0A` }}
                >
                  <SpeciesIcon id={species.id} color={species.color} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white/85">{species.name}</h3>
                  <div
                    className="mt-0.5 h-[2px] w-5 rounded-full transition-all group-hover:w-12"
                    style={{ backgroundColor: `${species.color}50` }}
                  />
                </div>
              </div>
              <p className="mb-3 text-[13px] leading-relaxed text-white/30">{species.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {species.traits.map((trait) => (
                  <span
                    key={trait}
                    className="rounded-md px-2 py-0.5 text-[10px] font-medium"
                    style={{
                      backgroundColor: `${species.color}08`,
                      color: `${species.color}80`,
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
