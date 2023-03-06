import { configureStore, createAsyncThunk } from '@reduxjs/toolkit'
import rootReducer from './slices'
import { useDispatch } from 'react-redux'

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  // middleware: middlewares
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store