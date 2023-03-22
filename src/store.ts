import { configureStore } from '@reduxjs/toolkit'
import albumReducer from './features/albums/albumSlice'
import filterReducer from './features/filter/filterSlice'

export const store = configureStore({
  reducer: {
    albums: albumReducer,
    filter: filterReducer
  }
})
