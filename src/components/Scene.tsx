import React from 'react'
import { useFrame } from '@react-three/fiber'
import { Ground } from './Ground'
import { Building } from './Building'
import { Tree } from './Tree'
import { useGameLogic } from '../hooks/useGameLogic'
import { GameSettings } from '../types/GameSettings'

interface SceneProps {
  settings: GameSettings
}

export const Scene: React.FC<SceneProps> = ({ settings }) => {
  const { perlin, alea, update } = useGameLogic(settings)

  useFrame(() => {
    update()
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 10]} intensity={0.8} />
      <Ground />
      {Array.from({ length: 100 }).map((_, i) => (
        <Building
          key={`building-${i}`}
          position={[
            (perlin.noise(i * 0.05, 0) - 0.5) * 200,
            0,
            (perlin.noise(0, i * 0.05) - 0.5) * 200
          ]}
          height={perlin.noise(i * 0.1, 0) * 20 + 10}
        />
      ))}
      {Array.from({ length: 200 }).map((_, i) => (
        <Tree
          key={`tree-${i}`}
          position={[
            (perlin.noise(i * 0.1, 100) - 0.5) * 300,
            2.5,
            (perlin.noise(100, i * 0.1) - 0.5) * 300
          ]}
        />
      ))}
    </>
  )
}
