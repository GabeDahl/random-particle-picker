import { Stack } from '@mui/material'
import RandomSelectionControls from './RandomSelectionControls'
import { AxisTracingControls } from './AxisTracingControls'
import { CameraControls } from './CameraControls'
import { ParticleSizeControls } from './ParticleSizeControls'
import { ParticleSpeedControls } from './ParticleSpeedControls'

export const Controls = () => {
  return (
    <>
      <RandomSelectionControls />
      <ParticleSpeedControls />
      <ParticleSizeControls />
      <Stack justifyContent='space-between' spacing={3} direction='row'>
        <AxisTracingControls />
        <CameraControls />
      </Stack>
    </>
  )
}
