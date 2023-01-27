import React, { useState } from 'react'
import { Slider, Stack } from '@mui/material'
import { store, useAppDispatch } from '@/redux/store'
import Typography from '@mui/material/Typography'
import { updateSpeed } from '@/redux/features/controlsSlice'

export const ParticleSpeedControls = () => {
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

  return (
    <Stack direction={'column'} spacing={1} p={1}>
      <Typography sx={{ color: '#d1d1d1' }}>Particle Speed</Typography>
      <Slider
        sx={{ pointerEvents: 'all' }}
        min={0.1}
        step={0.1}
        max={6.9}
        valueLabelDisplay='auto'
        value={inputValue}
        onChange={handleSliderChange}
        onChangeCommitted={handleSliderChangeComitted}
      />
    </Stack>
  )
}
