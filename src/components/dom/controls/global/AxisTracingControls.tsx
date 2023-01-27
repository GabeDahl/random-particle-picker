import {
  FormGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import React, { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { controlsSlice } from '@/redux/features/controlsSlice'

export const AxisTracingControls = () => {
  const controls = useAppSelector((state) => state.controls)
  const dispatch = useAppDispatch()
  const handleAxisTracingChange = (
    axis: 'X' | 'Y' | 'Z',
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.checked) {
      dispatch(controlsSlice.actions[`enableAxis${axis}`]())
    } else {
      dispatch(controlsSlice.actions[`disableAxis${axis}`]())
    }
  }
  return (
    <FormControl component='fieldset' sx={{ pointerEvents: 'all' }}>
      <FormLabel component='legend'>Axis Tracing</FormLabel>
      <FormGroup aria-label='position' row>
        <FormControlLabel
          control={
            <Checkbox
              checked={controls.axisXEnabled}
              onChange={(e) => handleAxisTracingChange('X', e)}
            />
          }
          label='X'
          labelPlacement='end'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={controls.axisYEnabled}
              onChange={(e) => handleAxisTracingChange('Y', e)}
            />
          }
          label='Y'
          labelPlacement='end'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={controls.axisZEnabled}
              onChange={(e) => handleAxisTracingChange('Z', e)}
            />
          }
          label='Z'
          labelPlacement='end'
        />
      </FormGroup>
    </FormControl>
  )
}
