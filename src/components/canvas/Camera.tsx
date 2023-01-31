import React, { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useAppSelector } from '@/redux/store'
import { attractors } from '@/util/attractors'

export const Camera = () => {
  const activeAttractor = useAppSelector(
    (state) => state.controls.activeAttractor,
  )
  const cam = useThree((state) => state.camera)
  const camPosRef = useRef({ x: 0, y: 0, z: 0 })
  useFrame(({ camera }, delta) => {
    console.log(camera.position.x, camera.position.y, camera.position.z)
  })
  useEffect(() => {
    if (!attractors[activeAttractor].defaultCameraPosition) return
    cam.position.set(
      attractors[activeAttractor].defaultCameraPosition[0],
      attractors[activeAttractor].defaultCameraPosition[1],
      attractors[activeAttractor].defaultCameraPosition[2],
    )
  }, [activeAttractor])
  return null
}
