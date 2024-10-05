import React from 'react'
import { Cone } from '@react-three/drei'

interface TreeProps {
  position: [number, number, number]
}

export const Tree: React.FC<TreeProps> = ({ position }) => {
  return (
    <Cone args={[2, 5, 8]} position={position}>
      <meshPhongMaterial color={0x2d4c1e} />
    </Cone>
  )
}
