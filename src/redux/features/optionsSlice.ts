import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Option {
  name: string
  numParticles: number
  color: string
  isRendering: boolean
  brightness: number
  forceRerenderCounter: number
}
export interface SelectedParticle {
  name: string
  color: string
  optionName: string
  index: number
}
export interface OptionsState {
  options: Option[]
  selectedParticle: SelectedParticle
}
const initialState: OptionsState = {
  options: [
    {
      name: 'Option 1',
      numParticles: 10000,
      color: '#362FBA',
      isRendering: true,
      brightness: 12,
      forceRerenderCounter: 0,
    },
    {
      name: 'Option 2',
      numParticles: 10000,
      color: '#662e9b',
      isRendering: true,
      brightness: 12,
      forceRerenderCounter: 0,
    },
    {
      name: 'Option 3',
      numParticles: 10000,
      color: '#00fff0',
      isRendering: true,
      brightness: 12,
      forceRerenderCounter: 0,
    },
    {
      name: 'Option 4',
      numParticles: 10000,
      color: '#FEB845',
      isRendering: true,
      brightness: 12,
      forceRerenderCounter: 0,
    },
  ],
  selectedParticle: {
    name: null,
    color: null,
    optionName: null,
    index: null,
  },
}
export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    addOption: (state, action: PayloadAction<Option>) => {
      Object.keys(state.selectedParticle).forEach(
        (i) => (state.selectedParticle[i] = null),
      )
      state.options.push(action.payload)
    },
    removeOption: (state, action: PayloadAction<number>) => {
      Object.keys(state.selectedParticle).forEach(
        (i) => (state.selectedParticle[i] = null),
      )
      state.options.splice(action.payload, 1)
    },
    updateOption: (
      state,
      action: PayloadAction<{ index: number; option: Option }>,
    ) => {
      if (Number.isNaN(action.payload.option.numParticles)) {
        state.options[action.payload.index] = {
          ...action.payload.option,
          numParticles: 0,
        }
      }
      Object.keys(state.selectedParticle).forEach(
        (i) => (state.selectedParticle[i] = null),
      )
      state.options[action.payload.index] = action.payload.option
    },
    updateSelectedParticle: (
      state,
      action: PayloadAction<SelectedParticle>,
    ) => {
      state.selectedParticle = action.payload
    },
    clearSelectedParticle: (state) => {
      Object.keys(state.selectedParticle).forEach(
        (i) => (state.selectedParticle[i] = null),
      )
    },
    // Look at this beauty :D
    forceRerender: (state, action: PayloadAction<{ index: number }>) => {
      state.options[action.payload.index] = {
        ...state.options[action.payload.index],
        forceRerenderCounter:
          state.options[action.payload.index].forceRerenderCounter + 1,
      }
    },
  },
})

export const {
  addOption,
  removeOption,
  updateOption,
  updateSelectedParticle,
  clearSelectedParticle,
  forceRerender,
} = optionsSlice.actions
