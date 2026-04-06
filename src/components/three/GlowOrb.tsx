'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function GlowOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime

    meshRef.current.scale.setScalar(1 + Math.sin(t * 0.4) * 0.05)

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.15
      ring1Ref.current.rotation.y = t * 0.1
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.1
      ring2Ref.current.rotation.z = t * 0.12
    }
  })

  return (
    <group position={[0, 0, -5]}>
      {/* Core orb — very subtle */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#39FF14"
          emissive="#39FF14"
          emissiveIntensity={1}
          transparent
          opacity={0.06}
        />
      </mesh>

      {/* Orbiting ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.5, 0.005, 8, 64]} />
        <meshBasicMaterial color="#39FF14" transparent opacity={0.1} />
      </mesh>

      {/* Orbiting ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3.2, 0.003, 8, 64]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.06} />
      </mesh>
    </group>
  )
}
