'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function GlowOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current || !glowRef.current) return
    const t = state.clock.elapsedTime

    meshRef.current.scale.setScalar(1 + Math.sin(t * 0.5) * 0.1)
    glowRef.current.scale.setScalar(1.5 + Math.sin(t * 0.3) * 0.2)
    glowRef.current.rotation.z = t * 0.1
  })

  return (
    <group position={[0, 0, -5]}>
      {/* Core orb */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#39FF14"
          emissive="#39FF14"
          emissiveIntensity={2}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={0.5}
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}
