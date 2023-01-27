import React, { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useAppSelector } from '@/redux/store'
import { Color, MathUtils, Object3D } from 'three'
import { Point, Points } from '@react-three/drei'

const ParticleCloud = ({ index }: { index: number }) => {
  const option = useAppSelector((state) => state.options.options[index])
  const cloudRef = useRef(null)
  const isMobile = useThree((state) => state.size.width < 900)
  const data = useMemo(() => {
    return Array.from({ length: option.numParticles }, (value, index) => ({
      factor: MathUtils.randInt(20, 500),
      speed: MathUtils.randFloat(0.01, 1),
      xFactor: MathUtils.randFloatSpread(1),
      yFactor: MathUtils.randFloatSpread(1),
      zFactor: MathUtils.randFloatSpread(1),
      name: `${option.name}_${index}`,
    }))
  }, [option])

  useFrame((state, delta) => {
    cloudRef.current.rotation.x += delta / 8
    cloudRef.current.rotation.y += delta / 8
    cloudRef.current.rotation.z += delta / 8
  })
  return (
    <Points limit={1000000} ref={cloudRef} position={[0, 0, 0]}>
      <pointsMaterial
        size={isMobile ? 0.1 : 0.01}
        color={new Color(option.color).multiplyScalar(50)}
      />

      {data.map((data, i) => (
        <Particle key={i} {...data} />
      ))}
    </Points>
  )
}

const Particle = ({ factor, speed, xFactor, yFactor, zFactor, name }) => {
  const ref = useRef<Object3D>(null)
  useFrame((state) => {
    const t = factor + state.clock.elapsedTime * (speed / 2)

    ref.current.position.set(
      Math.cos(t) +
        Math.sin(t * 2) / 10 +
        xFactor +
        Math.cos((t / 10) * factor) +
        (Math.sin(t * 3) * factor) / 10,
      Math.sin(t) +
        Math.cos(t * 2) / 10 +
        yFactor +
        Math.sin((t / 10) * factor) +
        (Math.cos(t * 2) * factor) / 10,
      Math.sin(t) +
        Math.cos(t * 3) / 10 +
        zFactor +
        Math.cos((t / 10) * factor) +
        (Math.sin(t * 2) * factor) / 10,
    )
  })

  return (
    <Point
      position={[xFactor * 20, yFactor * 20, zFactor * 20]}
      ref={ref}
      name={name}
    />
  )
}
