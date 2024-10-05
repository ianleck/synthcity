import React from 'react'
import { Plane } from '@react-three/drei'

export const Ground: React.FC = () => {
  return (
    <Plane
      args={[1000, 1000]}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
    >
      <meshStandardMaterial color={0x1a5f1a} />
    </Plane>
  )
}
