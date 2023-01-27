import { createSlice } from '@reduxjs/toolkit'

export interface LayoutState {
  controlsOpen: boolean
  optionsOpen: boolean
}

const initialState: LayoutState = {
  controlsOpen: false,
  optionsOpen: false,
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    openControls: (state) => {
      state.optionsOpen = false
      state.controlsOpen = true
    },
    closeControls: (state) => {
      state.controlsOpen = false
    },
    openOptions: (state) => {
      state.controlsOpen = false
      state.optionsOpen = true
    },
    closeOptions: (state) => {
      state.optionsOpen = false
    },
  },
})

export const { openControls, closeControls, openOptions, closeOptions } =
  layoutSlice.actions
