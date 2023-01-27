import {
  FormGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import React, { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { disableLockOn, enableLockOn } from '@/redux/features/controlsSlice'

export const CameraControls = () => {
  const controls = useAppSelector((state) => state.controls)
  const dispatch = useAppDispatch()

  const handleLockOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(enableLockOn())
    } else {
      dispatch(disableLockOn())
    }
  }
  return (
    <FormControl component='fieldset' sx={{ pointerEvents: 'all' }}>
      <FormLabel component='legend'>Camera</FormLabel>
      <FormGroup aria-label='position' row>
        <FormControlLabel
          control={
            <Checkbox
              checked={controls.lockedOn}
              onChange={handleLockOnChange}
            />
          }
          label='Lock On'
          labelPlacement='end'
        />
      </FormGroup>
    </FormControl>
  )
}
