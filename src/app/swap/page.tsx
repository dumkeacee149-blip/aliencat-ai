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
        <div className="mx-auto max-w-xl px-4">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-white">
              Alien Face Swap
            </h1>
            <p className="text-sm text-white/50">
              Upload a selfie. AI scans your facial geometry.
              Discover your alien species in 30 seconds.
            </p>
          </div>

          {/* Upload zone - hide when processing/done */}
          {(status === 'idle' || status === 'error') && <UploadZone />}

          {/* Result area */}
          <SwapResult />

          {/* Disclaimer */}
          <p className="mt-8 text-center text-xs text-white/20">
            Your photos are processed in real-time and not stored on our servers.
            Results are for entertainment purposes only. Or are they?
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
