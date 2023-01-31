// @ts-nocheck
import { Option } from '@/redux/features/optionsSlice'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef } from 'react'
import { BufferAttribute, Color, Points } from 'three'
import { useAppSelector } from '@/redux/store'
import { Attractor, attractors } from '@/util/attractors'
import { random } from 'maath'

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
  const cachedAttractor = useRef<Attractor>(null)
  useEffect(() => {
    cachedAttractor.current = attractors[activeAttractor]
  }, [activeAttractor])

  const initialPositions: Float32Array = useMemo(() => {
    const positions = new Float32Array(numParticles * 3)
    for (let i = 0; i < numParticles * 3; i += 3) {
      const [x, y, z] = generateRandomPointInSphere(1)

      positions[i] = x + (cachedAttractor.current?.initialPosition[0] || 0)
      positions[i + 1] = y + (cachedAttractor.current?.initialPosition[1] || 0)
      positions[i + 2] = z + (cachedAttractor.current?.initialPosition[2] || 0)
    }
    console.log(positions)
    return positions
  }, [activeAttractor, numParticles, forceRerenderCounter])

  useEffect(() => {
    const positions = pointsRef.current.geometry.attributes.position.array
    for (let i = 0; i < numParticles * 3; i++) {
      positions[i] = initialPositions[i]
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  }, [])

  useFrame((state, delta) => {
    if (delta > 0.2 || !cachedAttractor.current) return
    const positions = pointsRef.current.geometry.attributes.position.array
    for (let i = 0; i < numParticles * 3; i += 3) {
      const x = positions[i],
        y = positions[i + 1],
        z = positions[i + 2]
      const [xn, yn, zn] = cachedAttractor.current.stepForward({
        x,
        y,
        z,
        delta: speed * 0.0015,
      })
      positions[i] = xn
      positions[i + 1] = yn
      positions[i + 2] = zn
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })
  const scaledColor = useMemo(
    () => new Color(color).multiplyScalar(brightness),
    [color, brightness],
  )
  return (
    <points
      visible={isRendering}
      frustumCulled={false}
      ref={pointsRef}
      name={`${option.name}-particles`}>
      <pointsMaterial size={size} color={scaledColor} />
      <bufferGeometry
        attributes={{
          position: new BufferAttribute(initialPositions, 3),
        }}
      />
    </points>
  )
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

function generateRandomPointInSphere(radius: number) {
  const theta = Math.random() * 2 * Math.PI
  const phi = Math.acos(2 * Math.random() - 1)
  const x = radius * Math.sin(phi) * Math.cos(theta)
  const y = radius * Math.sin(phi) * Math.sin(theta)
  const z = radius * Math.cos(phi)
  return [x, y, z]
}
