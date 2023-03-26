import cartReducer from './features/cart/cartSlice'
import userReducer from './features/user/userSlice'
import albumReducer from './features/albums/albumSlice'
import filterReducer from './features/filter/filterSlice'
import ordersReducer from './features/orders/ordersSlice'
import { setFilter } from './features/filter/filterSlice'
import { isAnyOf, configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import { adminAddAlbum, adminPatchAlbum, adminRemoveAlbum } from './features/albums/albumSlice'

const modifiedView = createListenerMiddleware()

modifiedView.startListening({
  matcher: isAnyOf(adminAddAlbum, adminPatchAlbum, adminRemoveAlbum),
  effect: (action, state) => {
    state.dispatch(setFilter({ page: 1 }))
  }
})

export const store = configureStore({
  reducer: {
    albums: albumReducer,
    filter: filterReducer,
    user: userReducer,
    orders: ordersReducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(modifiedView.middleware)
})
