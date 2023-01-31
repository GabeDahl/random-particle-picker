import { Canvas, extend, ReactThreeFiber } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import { Stack } from '@mui/material'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Line } from 'three'
import { SelectionPointerV2 } from './v2/SelectionPointerV2'
import { Camera } from './Camera'

extend({ Line_: Line })

// declare `line_` as a JSX element so that typescript doesn't complain
declare global {
  namespace JSX {
    interface IntrinsicElements {
      line_: ReactThreeFiber.Object3DNode<Line, typeof Line>
    }
  }
}
export default function Scene({ children, ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Stack
      sx={{
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        left: 0,
        top: 0,
      }}>
      <Canvas {...props} linear flat>
        <color attach='background' args={[0, 0, 0]} />
        <SelectionPointerV2 />
        <Camera />
        {children}
        <Preload all />
        <OrbitControls zoomSpeed={1} maxDistance={1000} minDistance={0.1} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.01} luminanceSmoothing={0.0001} />
        </EffectComposer>
      </Canvas>
    </Stack>
  )
}
