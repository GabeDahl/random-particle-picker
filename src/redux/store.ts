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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
