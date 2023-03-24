import { TPurchase } from '../../types/types'
import { createSlice } from '@reduxjs/toolkit'

export const initialCartState: { purchases: TPurchase[] } = {
  purchases: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    resetCart: () => initialCartState,
    addToCart: (state, action) => {
      const { albumId, cost } = action.payload
      const index = state.purchases.findIndex((item) => albumId === item.albumId)
      if (index >= 0) {
        state.purchases[index].quantity++
        state.purchases[index].cost += cost
      } else {
        state.purchases.push(action.payload)
      }
    }
  }
})

export const { resetCart, addToCart } = cartSlice.actions
export default cartSlice.reducer
