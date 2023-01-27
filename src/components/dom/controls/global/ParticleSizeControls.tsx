import React, { useEffect, useState } from 'react'
import { Slider, Stack, useMediaQuery } from '@mui/material'
import { store, useAppDispatch } from '@/redux/store'
import Typography from '@mui/material/Typography'
import { updateSize } from '@/redux/features/controlsSlice'
import { useIsLargeViewport } from '@/hooks/useIsLargeViewport'

const sizes = [0.0001, 0.001, 0.01, 0.1, 1]

export const ParticleSizeControls = () => {
  const dispatch = useAppDispatch()
  const isLargeViewport = useIsLargeViewport()
  const [inputValue, setInputValue] = useState(() => {
    return store.getState().controls.size
  })
  const handleSliderChange = (event: Event, newValue: number) => {
    setInputValue(newValue)
  }

  const handleSliderChangeComitted = (event: Event, newValue: number) => {
    dispatch(updateSize(sizes[newValue]))
  }

  useEffect(() => {
    if (isLargeViewport) return
    dispatch(updateSize(0.01))
  }, [])

  return (
    <Stack direction={'column'} spacing={1} p={1}>
      <Typography sx={{ color: '#d1d1d1' }}>Particle Size</Typography>
      <Slider
        sx={{ pointerEvents: 'all' }}
        min={1}
        max={sizes.length - 1}
        valueLabelDisplay='auto'
        value={inputValue}
        onChange={handleSliderChange}
        onChangeCommitted={handleSliderChangeComitted}
      />
    </Stack>
  )
}
