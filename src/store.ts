import { configureStore } from '@reduxjs/toolkit'
import albumReducer from './features/albums/albumSlice'
import filterReducer from './features/filter/filterSlice'
import userReducer from './features/user/userSlice'

export const store = configureStore({
  reducer: {
    albums: albumReducer,
    filter: filterReducer,
    user: userReducer
  }
})
