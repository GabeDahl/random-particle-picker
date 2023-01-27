import { useFrame, useThree } from '@react-three/fiber'
import React, { useRef, useEffect } from 'react'
import { Vector3, Line, Points, MathUtils, Color } from 'three'
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

// I should probaly rewrite this so its less WET.
// It work for now.
// Could use some LERPing for smoother camera actions
export const SelectionPointerV2 = () => {
  const { axisXEnabled, axisYEnabled, axisZEnabled, lockedOn } = useAppSelector(
    (state) => state.controls,
  )
  const selectedParticle = useAppSelector(
    (state) => state.options.selectedParticle,
  )
  const scene = useThree((state) => state.scene)
  const selectedOptionParticles = useRef<Points>(null)
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
    selectedOptionParticles.current = scene.getObjectByName(
      `${selectedParticle.optionName}-particles`,
    ) as Points
  }, [selectedParticle])

  // useEffect(() => {
  //   lockOnTimer.current = 0
  // }, [lockedOn])

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

  const lockOnTimer = useRef(2)
  useFrame((state, delta) => {
    if (
      !selectedOptionParticles.current ||
      (!axisXEnabled && !axisYEnabled && !axisZEnabled)
    )
      return
    const positions =
      selectedOptionParticles.current.geometry.attributes.position.array
    const i = selectedParticle.index * 3
    const particlePosition = spareVector.set(
      positions[i],
      positions[i + 1],
      positions[i + 2],
    )
    xPos.current.geometry.dispose()
    xNeg.current.geometry.dispose()
    yPos.current.geometry.dispose()
    yNeg.current.geometry.dispose()
    zPos.current.geometry.dispose()
    zNeg.current.geometry.dispose()
    if (axisXEnabled) {
      xPos.current.geometry.setFromPoints([originXPos, particlePosition])
      xNeg.current.geometry.setFromPoints([originXNeg, particlePosition])
    }
    if (axisYEnabled) {
      yPos.current.geometry.setFromPoints([originYPos, particlePosition])
      yNeg.current.geometry.setFromPoints([originYNeg, particlePosition])
    }
    if (axisZEnabled) {
      zPos.current.geometry.setFromPoints([originZPos, particlePosition])
      zNeg.current.geometry.setFromPoints([originZNeg, particlePosition])
    }

    if (lockedOn) {
      if (lockOnTimer.current >= lerpTime) {
        state.camera.lookAt(particlePosition)
      } else {
        const x = MathUtils.lerp(0, particlePosition.x, lockOnTimer.current)
        const y = MathUtils.lerp(0, particlePosition.y, lockOnTimer.current)
        const z = MathUtils.lerp(0, particlePosition.z, lockOnTimer.current)
        state.camera.lookAt(spareVector.set(x, y, z))
        lockOnTimer.current += delta
      }
    } else {
      if (lockOnTimer.current >= lerpTime) return
      const x = MathUtils.lerp(particlePosition.x, 0, lockOnTimer.current)
      const y = MathUtils.lerp(particlePosition.y, 0, lockOnTimer.current)
      const z = MathUtils.lerp(particlePosition.z, 0, lockOnTimer.current)
      state.camera.lookAt(spareVector.set(x, y, z))
      lockOnTimer.current += delta
    }
  })
  const color = selectedParticle.color
    ? new Color(selectedParticle.color).multiplyScalar(10)
    : 'white'

  if (!selectedParticle) return null
  return (
    <group>
      <line_ ref={xPos} frustumCulled={false}>
        <lineBasicMaterial color={color} />
        <bufferGeometry />
      </line_>
      <line_ ref={xNeg} frustumCulled={false}>
        <lineBasicMaterial color={color} />
        <bufferGeometry />
      </line_>
      <line_ ref={yPos} frustumCulled={false}>
        <lineBasicMaterial color={color} />
        <bufferGeometry />
      </line_>
      <line_ ref={yNeg} frustumCulled={false}>
        <lineBasicMaterial color={color} />
        <bufferGeometry />
      </line_>
      <line_ ref={zPos} frustumCulled={false}>
        <lineBasicMaterial color={color} />
        <bufferGeometry />
      </line_>
      <line_ ref={zNeg} frustumCulled={false}>
        <lineBasicMaterial color={color} />
        <bufferGeometry />
      </line_>
    </group>
  )
}
