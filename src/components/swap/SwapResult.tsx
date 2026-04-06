'use client'

import { useSwapStore } from '@/stores/swap-store'
import { SPECIES_DATA } from '@/lib/species'
import { ScanLine } from '@/components/ui/ScanLine'

export function SwapResult() {
  const { status, progress, statusText, result, error, previewUrl, reset } = useSwapStore()

  if (status === 'idle') return null

  const species = result ? SPECIES_DATA[result.species] : null

  return (
    <div className="w-full space-y-6">
      {/* Progress */}
      {(status === 'uploading' || status === 'analyzing' || status === 'generating') && (
        <div className="space-y-6">
          {previewUrl && (
            <div className="relative mx-auto h-64 w-64 overflow-hidden rounded-xl border border-white/[0.06]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl} alt="Your face" className="h-full w-full object-cover" />
              {/* Scan overlay */}
              <div className="absolute inset-0 bg-[#39FF14]/[0.05]">
                <div className="absolute left-0 right-0 h-px animate-scan bg-gradient-to-r from-transparent via-[#39FF14] to-transparent" />
              </div>
              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-15" style={{
                backgroundImage: 'linear-gradient(rgba(57,255,20,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.25) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }} />
              {/* Corner markers */}
              <div className="absolute top-2 left-2 h-5 w-5 border-l border-t border-[#39FF14]/30" />
              <div className="absolute top-2 right-2 h-5 w-5 border-r border-t border-[#39FF14]/30" />
              <div className="absolute bottom-2 left-2 h-5 w-5 border-l border-b border-[#39FF14]/30" />
              <div className="absolute bottom-2 right-2 h-5 w-5 border-r border-b border-[#39FF14]/30" />
              {/* Status label */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-1.5 text-center">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#39FF14]/50">Scanning...</span>
              </div>
            </div>
          )}
          <ScanLine progress={progress} statusText={statusText} />
        </div>
      )}

      {/* Error */}
      {status === 'error' && (
        <div className="rounded-xl border border-red-500/15 bg-red-500/[0.04] p-6 text-center">
          <p className="mb-2 text-sm font-medium text-red-400/70">Scan failed</p>
          <p className="mb-4 text-[13px] text-red-300/30">{error}</p>
          <button onClick={reset} className="rounded-lg bg-white/[0.05] px-5 py-2 text-[13px] text-white/50 hover:bg-white/[0.08] transition">
            Try again
          </button>
        </div>
      )}

      {/* Result */}
      {status === 'done' && result && species && (
        <div className="space-y-5">
          {/* Before / After */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative overflow-hidden rounded-xl border border-white/[0.06]">
              {previewUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewUrl} alt="Original" className="aspect-square w-full object-cover" />
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-2 text-center">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">Human Form</span>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl border border-[#39FF14]/15">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={result.alienUrl} alt="Alien form" className="aspect-square w-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-2 text-center">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#39FF14]/50">True Form</span>
              </div>
            </div>
          </div>

          {/* Species Card */}
          <div className="card-premium rounded-xl p-5">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${species.color}0A` }}>
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: species.color }} />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-white/85">{species.name}</h3>
                <p className="font-mono text-[11px] text-white/25">{result.matchPercent}% match</p>
              </div>
            </div>
            <p className="mb-3 text-[13px] leading-relaxed text-white/35">{species.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {species.traits.map((trait) => (
                <span key={trait} className="rounded-md px-2 py-0.5 text-[10px] font-medium" style={{ backgroundColor: `${species.color}08`, color: `${species.color}80` }}>
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `just discovered i'm ${result.matchPercent}% ${species.name} alien\n\nfind your species at aliencat.ai\n\n#AlienCatAI @alienaixyz`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] py-3 text-[13px] text-white/45 hover:bg-white/[0.06] hover:text-white/60 transition"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Share on X
            </a>
            <button
              onClick={reset}
              className="flex-1 rounded-lg border border-[#39FF14]/10 bg-[#39FF14]/[0.04] py-3 text-center text-[13px] font-medium text-[#39FF14]/60 hover:bg-[#39FF14]/[0.08] transition"
            >
              Scan Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
