'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { UploadZone } from '@/components/swap/UploadZone'
import { SwapResult } from '@/components/swap/SwapResult'
import { useSwapStore } from '@/stores/swap-store'

export default function SwapPage() {
  const status = useSwapStore((s) => s.status)

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-12">
        <div className="mx-auto max-w-xl px-6">
          {/* Header */}
          <div className="mb-10 text-center">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#39FF14]/30">
              Species Detection
            </p>
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Alien Face Swap
            </h1>
            <p className="text-[13px] text-white/30 max-w-sm mx-auto">
              Upload a selfie. AI scans your facial geometry and discovers your alien species in 30 seconds.
            </p>
          </div>

          {(status === 'idle' || status === 'error') && <UploadZone />}
          <SwapResult />

          <p className="mt-10 text-center text-[11px] text-white/10">
            Your photos are processed in real-time and not stored on our servers.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
