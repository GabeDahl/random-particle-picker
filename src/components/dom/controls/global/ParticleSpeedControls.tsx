import React, { useEffect, useState } from 'react'
import { Slider, Stack } from '@mui/material'
import { store, useAppDispatch } from '@/redux/store'
import Typography from '@mui/material/Typography'
import { updateSpeed } from '@/redux/features/controlsSlice'
import { useIsLargeViewport } from '@/hooks/useIsLargeViewport'

export const ParticleSpeedControls = () => {
  const isLargeViewport = useIsLargeViewport()
  const dispatch = useAppDispatch()
  const [inputValue, setInputValue] = useState(() => {
    return store.getState().controls.speed
  })
  const handleSliderChange = (event: Event, newValue: number) => {
    setInputValue(newValue)
  }

  const handleSliderChangeComitted = (event: Event, newValue: number) => {
    dispatch(updateSpeed(newValue))
  }

  useEffect(() => {
    if (isLargeViewport) return
    dispatch(updateSpeed(8))
  }, [])
  return (
    <Stack direction={'column'} spacing={1} p={1}>
      <Typography sx={{ color: '#d1d1d1' }}>Particle Speed</Typography>
      <Slider
        sx={{ pointerEvents: 'all' }}
        min={0.1}
        step={0.1}
        max={10}
        valueLabelDisplay='auto'
        value={inputValue}
        onChange={handleSliderChange}
        onChangeCommitted={handleSliderChangeComitted}
      />
    </Stack>
  )
}
