import { useFrame, useThree } from '@react-three/fiber'
import React, { useRef, useEffect } from 'react'
import { Vector3, Line, Object3D, MathUtils, Color } from 'three'
import { useAppSelector } from '@/redux/store'

const lerpTime = 1
const distance = 100
const spareVector = new Vector3(0, 0, 0)
const originXPos = new Vector3(distance, 0, 0)
const originXNeg = new Vector3(-distance, 0, 0)
const originYPos = new Vector3(0, distance, 0)
const originYNeg = new Vector3(0, -distance, 0)
const originZPos = new Vector3(0, 0, distance)
const originZNeg = new Vector3(0, 0, -distance)

const SelectionPointer = () => {
  const selectedParticle = useAppSelector(
    (state) => state.options.selectedParticle,
  )

  const { axisXEnabled, axisYEnabled, axisZEnabled, lockedOn } = useAppSelector(
    (state) => state.controls,
  )
  const scene = useThree((state) => state.scene)
  const selectedParticleRef = useRef<Object3D>()
  const xPos = useRef<Line>(null)
  const xNeg = useRef<Line>(null)
  const yPos = useRef<Line>(null)
  const yNeg = useRef<Line>(null)
  const zPos = useRef<Line>(null)
  const zNeg = useRef<Line>(null)

  const resetGeometries = () => {
    xPos.current.geometry.setFromPoints([originXPos, originXPos])
    xNeg.current.geometry.setFromPoints([originXNeg, originXNeg])
    yPos.current.geometry.setFromPoints([originYPos, originYPos])
    yNeg.current.geometry.setFromPoints([originYNeg, originYNeg])
    zPos.current.geometry.setFromPoints([originZPos, originZPos])
    zNeg.current.geometry.setFromPoints([originZNeg, originZNeg])
  }

  useEffect(() => {
    if (!selectedParticle.name) {
      resetGeometries()
    }

    selectedParticleRef.current = scene.getObjectByName(selectedParticle.name)
  }, [selectedParticle])

  useEffect(() => {
    lockOnTimer.current = 0
  }, [lockedOn])

  useEffect(() => {
    if (
      !xPos.current ||
      !xNeg.current ||
      !yPos.current ||
      !yNeg.current ||
      !zPos.current ||
      !zNeg.current
    )
      return
    resetGeometries()
  }, [axisXEnabled, axisYEnabled, axisZEnabled])

  const lockOnTimer = useRef(0)
  useFrame((state, delta) => {
    if (!selectedParticleRef.current) return
    const particlePos =
      selectedParticleRef.current.getWorldPosition(spareVector)
    xPos.current.geometry.dispose()
    xNeg.current.geometry.dispose()
    yPos.current.geometry.dispose()
    yNeg.current.geometry.dispose()
    zPos.current.geometry.dispose()
    zNeg.current.geometry.dispose()
    if (axisXEnabled) {
      xPos.current.geometry.setFromPoints([originXPos, particlePos])
      xPos.current.geometry.computeBoundingSphere()
      xNeg.current.geometry.setFromPoints([originXNeg, particlePos])
      xNeg.current.geometry.computeBoundingSphere()
    }
    if (axisYEnabled) {
      yPos.current.geometry.setFromPoints([originYPos, particlePos])
      yPos.current.geometry.computeBoundingSphere()
      yNeg.current.geometry.setFromPoints([originYNeg, particlePos])
      yNeg.current.geometry.computeBoundingSphere()
    }
    if (axisZEnabled) {
      zPos.current.geometry.setFromPoints([originZPos, particlePos])
      zPos.current.geometry.computeBoundingSphere()
      zNeg.current.geometry.setFromPoints([originZNeg, particlePos])
      zNeg.current.geometry.computeBoundingSphere()
    }

    if (lockedOn) {
      if (lockOnTimer.current >= lerpTime) {
        state.camera.lookAt(particlePos)
      } else {
        const x = MathUtils.lerp(0, particlePos.x, lockOnTimer.current)
        const y = MathUtils.lerp(0, particlePos.y, lockOnTimer.current)
        const z = MathUtils.lerp(0, particlePos.z, lockOnTimer.current)
        state.camera.lookAt(spareVector.set(x, y, z))
        lockOnTimer.current += delta
      }
    } else {
      if (lockOnTimer.current >= lerpTime) return
      const x = MathUtils.lerp(particlePos.x, 0, lockOnTimer.current)
      const y = MathUtils.lerp(particlePos.y, 0, lockOnTimer.current)
      const z = MathUtils.lerp(particlePos.z, 0, lockOnTimer.current)
      state.camera.lookAt(spareVector.set(x, y, z))
      lockOnTimer.current += delta
    }
  })
  const color = selectedParticle.color ? 9 : 'white'

  if (!selectedParticle) return null
  return (
    <>
      <line_ ref={xPos}>
        <lineBasicMaterial color={color} />
        <bufferGeometry />
      </line_>
      <line_ ref={xNeg}>
        <lineBasicMaterial color={color} />
        <bufferGeometry />
      </line_>
      <line_ ref={yPos}>
        <lineBasicMaterial color={color} />
        <bufferGeometry />
      </line_>
      <line_ ref={yNeg}>
        <lineBasicMaterial color={color} />
        <bufferGeometry />
      </line_>
      <line_ ref={zPos}>
        <lineBasicMaterial color={color} />
        <bufferGeometry />
      </line_>
      <line_ ref={zNeg}>
        <lineBasicMaterial color={color} />
        <bufferGeometry />
      </line_>
    </>
  )
}

export default SelectionPointer
