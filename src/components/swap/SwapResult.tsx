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
          {/* Preview of uploaded image with scan overlay */}
          {previewUrl && (
            <div className="relative mx-auto h-64 w-64 overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Your face"
                className="h-full w-full object-cover"
              />
              {/* Green scan overlay */}
              <div className="absolute inset-0 bg-[#39FF14]/10">
                <div className="absolute left-0 right-0 h-1 animate-scan bg-gradient-to-r from-transparent via-[#39FF14] to-transparent" />
              </div>
              {/* Grid overlay */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(57,255,20,0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(57,255,20,0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px',
                }}
              />
            </div>
          )}
          <ScanLine progress={progress} statusText={statusText} />
        </div>
      )}

      {/* Error */}
      {status === 'error' && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center">
          <p className="mb-2 text-lg text-red-400">Scan failed</p>
          <p className="mb-4 text-sm text-red-300/70">{error}</p>
          <button
            onClick={reset}
            className="rounded-lg bg-white/10 px-6 py-2 text-sm text-white hover:bg-white/20"
          >
            Try again
          </button>
        </div>
      )}

      {/* Result */}
      {status === 'done' && result && species && (
        <div className="space-y-6">
          {/* Before / After */}
          <div className="grid grid-cols-2 gap-4">
            {/* Original */}
            <div className="relative overflow-hidden rounded-xl border border-white/10">
              {previewUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewUrl}
                  alt="Original"
                  className="aspect-square w-full object-cover"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-center text-xs text-white/60">
                HUMAN FORM
              </div>
            </div>

            {/* Alien */}
            <div className="relative overflow-hidden rounded-xl border border-[#39FF14]/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={result.alienUrl}
                alt="Alien form"
                className="aspect-square w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-center text-xs text-[#39FF14]">
                TRUE FORM
              </div>
            </div>
          </div>

          {/* Species Card */}
          <div
            className="rounded-xl border p-6"
            style={{ borderColor: `${species.color}40`, backgroundColor: `${species.color}10` }}
          >
            <div className="mb-2 flex items-center gap-3">
              <span className="text-3xl">{species.emoji}</span>
              <div>
                <h3 className="text-xl font-bold text-white">{species.name}</h3>
                <p className="text-sm text-white/60">
                  {result.matchPercent}% match
                </p>
              </div>
            </div>
            <p className="mb-3 text-sm text-white/70">{species.description}</p>
            <div className="flex flex-wrap gap-2">
              {species.traits.map((trait) => (
                <span
                  key={trait}
                  className="rounded-full px-3 py-1 text-xs"
                  style={{ backgroundColor: `${species.color}20`, color: species.color }}
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Share buttons */}
          <div className="flex gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `just discovered i'm ${result.matchPercent}% ${species.name} alien 👽\n\nfind your species → aliencat.ai\n\n#AlienCatAI`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-lg bg-white/10 py-3 text-center text-sm font-medium text-white hover:bg-white/20 transition"
            >
              Share on X
            </a>
            <button
              onClick={reset}
              className="flex-1 rounded-lg bg-[#39FF14]/20 py-3 text-center text-sm font-medium text-[#39FF14] hover:bg-[#39FF14]/30 transition"
            >
              Scan Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
