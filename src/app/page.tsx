'use client'

import dynamic from 'next/dynamic'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/home/HeroSection'
import { HowItWorks } from '@/components/home/HowItWorks'
import { SpeciesShowcase } from '@/components/home/SpeciesShowcase'
import { CTASection } from '@/components/home/CTASection'

const HeroScene = dynamic(
  () => import('@/components/three/HeroScene').then(mod => ({ default: mod.HeroScene })),
  { ssr: false }
)

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="relative">
          <HeroScene />
          <HeroSection />
        </div>
        <HowItWorks />
        <SpeciesShowcase />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
