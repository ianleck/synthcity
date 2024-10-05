import React from 'react'
import { Box } from '@react-three/drei'

interface BuildingProps {
  position: [number, number, number]
  height: number
}

export const Building: React.FC<BuildingProps> = ({ position, height }) => {
  return (
    <Box args={[5, height, 5]} position={position}>
      <meshPhongMaterial color={0x808080} />
    </Box>
  )
}
