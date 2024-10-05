import React, { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { Scene } from './Scene'
import { GameSettings } from '../types/GameSettings'

interface ThreeCanvasProps {
  settings: GameSettings
}

const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ settings }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  return (
    <Canvas ref={canvasRef}>
      <Scene settings={settings} />
      <PerspectiveCamera makeDefault fov={75} position={[0, 5, 10]} />
      <OrbitControls />
    </Canvas>
  )
}

export default ThreeCanvas
