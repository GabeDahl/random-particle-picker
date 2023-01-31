import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { optionsSlice } from './features/optionsSlice'
import { controlsSlice } from './features/controlsSlice'
import { layoutSlice } from './features/layoutSlice'

export const store = configureStore({
  reducer: {
    options: optionsSlice.reducer,
    controls: controlsSlice.reducer,
    layout: layoutSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
