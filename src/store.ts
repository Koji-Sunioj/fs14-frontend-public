import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import albumReducer from './features/albums/albumSlice'
import filterReducer from './features/filter/filterSlice'
import ordersReducer from './features/orders/ordersSlice'
import cartReducer from './features/cart/cartSlice'

export const store = configureStore({
  reducer: {
    albums: albumReducer,
    filter: filterReducer,
    user: userReducer,
    orders: ordersReducer,
    cart: cartReducer
  }
})
