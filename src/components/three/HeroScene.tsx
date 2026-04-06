'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { StarField } from './StarField'
import { GlowOrb } from './GlowOrb'

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.1} />
          <pointLight position={[0, 0, 5]} color="#39FF14" intensity={2} />
          <StarField />
          <GlowOrb />
        </Suspense>
      </Canvas>
    </div>
  )
}
