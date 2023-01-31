import { updateActiveAttractor } from '@/redux/features/controlsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { AttractorKey, attractors } from '@/util/attractors'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import React from 'react'

export const AttractorControls = () => {
  const dispatch = useAppDispatch()
  const attractor = useAppSelector((state) => state.controls.activeAttractor)
  const handleChange = (event: SelectChangeEvent<AttractorKey>) => {
    dispatch(updateActiveAttractor(event.target.value as AttractorKey))
  }
  return (
    <FormControl sx={{ pointerEvents: 'all' }}>
      <InputLabel id='attractor-select-label'>Attractor</InputLabel>
      <Select
        labelId='attractor-select-label'
        id='attractor-select'
        value={attractor}
        label='Attractor'
        onChange={handleChange}>
        {Object.keys(attractors).map((attractor) => (
          <MenuItem key={attractor} value={attractor}>
            {attractor}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
