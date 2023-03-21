import { configureStore } from '@reduxjs/toolkit'
import albumReducer from './features/albums/albumSlice'

export const store = configureStore({
  reducer: {
    albums: albumReducer
  }
})
