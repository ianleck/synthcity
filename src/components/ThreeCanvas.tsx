import React, { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { GameSettings } from '../types/GameSettings'
import { useGameLogic } from '../hooks/useGameLogic'
import { Ground } from './Ground'
import { Building } from './Building'
import { Tree } from './Tree'
import { Player } from './Player'

interface SceneProps {
  settings: GameSettings
}

const Scene: React.FC<SceneProps> = ({ settings }) => {
  const { perlin } = useGameLogic(settings)

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 10]} intensity={0.8} />
      <Ground />
      <Player settings={settings} />
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

interface ThreeCanvasProps {
  settings: GameSettings
}

const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ settings }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  return (
    <Canvas ref={canvasRef}>
      <Scene settings={settings} />
      <PerspectiveCamera makeDefault fov={75} position={[0, 10, 20]} />
      <OrbitControls />
    </Canvas>
  )
}

export default ThreeCanvas
