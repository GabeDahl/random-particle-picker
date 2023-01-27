// @ts-nocheck
import { Option } from '@/redux/features/optionsSlice'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef } from 'react'
import { BufferAttribute, Color, Points } from 'three'
import { useAppSelector } from '@/redux/store'
import { attractors } from '@/util/attractors'
// export const attractors = {
//   lorenz: ({ x, y, z, delta }: AttractorParams): AttractorResults => {
//     const σ = 10,
//       ρ = 28,
//       β = 8 / 3
//     const xn = x + σ * (-x + y) * delta
//     const yn = y + (-x * z + ρ * x - y) * delta
//     const zn = z + (x * y - β * z) * delta
//     return [xn, yn, zn]
//   },
// }
export const ParticleWrapper = ({ index }: { index: number }) => {
  const option = useAppSelector((state) => state.options.options[index])
  useAppSelector((state) => state.options.options)
  if (!option) return null
  return <ParticlesV2 option={option} />
}

export const ParticlesV2 = ({ option }: { option: Option }) => {
  const pointsRef = useRef<Points>(null)
  const { numParticles, color, isRendering, brightness, forceRerenderCounter } =
    option
  const { size, speed, activeAttractor } = useAppSelector(
    (state) => state.controls,
  )

  const initialPositions = useMemo(() => {
    const positions = new Float32Array(numParticles * 3)
    for (let i = 0; i < numParticles * 3; i += 3) {
      const pt = getPoint()
      positions[i] = pt.x * 2
      positions[i + 1] = pt.y * 2
      positions[i + 2] = pt.z * 2
    }

    return positions
  }, [numParticles])

  useEffect(() => {
    const positions = pointsRef.current.geometry.attributes.position.array
    for (let i = 0; i < numParticles * 3; i += 3) {
      const pt = getPoint()
      positions[i] = pt.x * 2
      positions[i + 1] = pt.y * 2
      positions[i + 2] = pt.z * 2
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  }, [forceRerenderCounter])
  useFrame((state, delta) => {
    if (delta > 0.2) return
    const positions = pointsRef.current.geometry.attributes.position.array
    for (let i = 0; i < numParticles * 3; i += 3) {
      const x = positions[i],
        y = positions[i + 1],
        z = positions[i + 2]

      // [xn, yn, zn] = attractors[activeAttractor]({
      //   x,
      //   y,
      //   z,
      //   delta: 0.001 * speed,
      // })
      const σ = 10,
        ρ = 28,
        β = 8 / 3
      const xn = x + σ * (-x + y) * delta
      const yn = y + (-x * z + ρ * x - y) * delta
      const zn = z + (x * y - β * z) * delta
      positions[i] = xn
      positions[i + 1] = yn
      positions[i + 2] = zn
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })
  return (
    <points
      visible={isRendering}
      frustumCulled={false}
      ref={pointsRef}
      name={`${option.name}-particles`}>
      <pointsMaterial
        size={size}
        color={new Color(color).multiplyScalar(brightness)}
      />
      <bufferGeometry
        attributes={{
          position: new BufferAttribute(initialPositions, 3),
        }}
      />
    </points>
  )
}

function getPoint() {
  const u = Math.random()
  const v = Math.random()
  const theta = u * 2.0 * Math.PI
  const phi = Math.acos(2.0 * v - 1.0)
  const r = Math.cbrt(Math.random())
  const sinTheta = Math.sin(theta)
  const cosTheta = Math.cos(theta)
  const sinPhi = Math.sin(phi)
  const cosPhi = Math.cos(phi)
  const x = r * sinPhi * cosTheta
  const y = r * sinPhi * sinTheta
  const z = r * cosPhi
  return { x: x, y: y, z: z }
}
export default function Particles() {
  const { camera } = useThree()
  useEffect(() => {
    camera.position.z = 70
  }, [])
  const numOptions = useAppSelector((state) => state.options.options.length)
  return (
    <>
      {Array.from({ length: numOptions }).map((v, i) => (
        <ParticleWrapper key={i} index={i} />
      ))}
    </>
  )
}
