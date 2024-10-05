import React from 'react'
import { useFrame } from '@react-three/fiber'

interface PlayerProps {
  position: { x: number; y: number; z: number }
}

export const Player: React.FC<PlayerProps> = ({ position }) => {
  useFrame(() => {
    // Update player position or perform other player-specific updates
  })

  return (
    <mesh position={[position.x, position.y, position.z]}>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  )
}
