import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGameLogic } from '../hooks/useGameLogic'
import { GameSettings } from '../types/GameSettings'

interface PlayerProps {
  settings: GameSettings
}

export const Player: React.FC<PlayerProps> = ({ settings }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const { playerPosition, updatePlayerPosition } = useGameLogic(settings)

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Update player position based on game logic
      const newPosition = updatePlayerPosition(delta)
      meshRef.current.position.set(newPosition.x, newPosition.y, newPosition.z)

      // Update camera position to follow the player
      state.camera.position.set(newPosition.x, newPosition.y + 5, newPosition.z + 10)
      state.camera.lookAt(newPosition.x, newPosition.y, newPosition.z)
    }
  })

  return (
    <mesh ref={meshRef} position={[playerPosition.x, playerPosition.y, playerPosition.z]}>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  )
}
