import { Attractor, attractors } from '@/util/attractors'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ControlsState {
  lockedOn: boolean
  axisXEnabled: boolean
  axisYEnabled: boolean
  axisZEnabled: boolean
  size: number
  speed: number
  activeAttractor: keyof typeof attractors
}

const initialState: ControlsState = {
  axisXEnabled: true,
  axisYEnabled: true,
  axisZEnabled: true,
  lockedOn: false,
  size: 0.001,
  speed: 4,
  activeAttractor: 'lorenz',
}

export const controlsSlice = createSlice({
  name: 'controls',
  initialState,
  reducers: {
    enableLockOn: (state) => {
      state.lockedOn = true
    },
    disableLockOn: (state) => {
      state.lockedOn = false
    },
    enableAxisX: (state) => {
      state.axisXEnabled = true
    },
    enableAxisY: (state) => {
      state.axisYEnabled = true
    },
    enableAxisZ: (state) => {
      state.axisZEnabled = true
    },
    disableAxisX: (state) => {
      state.axisXEnabled = false
    },
    disableAxisY: (state) => {
      state.axisYEnabled = false
    },
    disableAxisZ: (state) => {
      state.axisZEnabled = false
    },
    updateSize: (state, action: PayloadAction<number>) => {
      state.size = action.payload
    },
    updateSpeed: (state, action: PayloadAction<number>) => {
      state.speed = action.payload
    },
    updateActiveAttractor: (
      state,
      action: PayloadAction<keyof typeof attractors>,
    ) => {
      state.activeAttractor = action.payload
    },
  },
})

export const {
  enableLockOn,
  disableLockOn,
  enableAxisX,
  enableAxisY,
  enableAxisZ,
  disableAxisX,
  disableAxisY,
  disableAxisZ,
  updateSize,
  updateSpeed,
  updateActiveAttractor,
} = controlsSlice.actions
