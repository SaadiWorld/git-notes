import { configureStore, PreloadedState } from '@reduxjs/toolkit'
import rootReducer from './slices'
import { useDispatch } from 'react-redux'

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
    // middleware: middlewares
    preloadedState
  })
}

const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export const useAppDispatch: () => AppDispatch = useDispatch

export default store