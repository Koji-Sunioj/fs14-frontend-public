import { TOrdersState, TOrder } from '../../types/types'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchOrders = createAsyncThunk('fetch-orders', async (email: string) => {
  const request = await fetch('orders.json')
  const response = await request.json()
  if (!request.ok) {
    const { message } = response
    throw new Error(message)
  }
  return { orders: response, user: email }
})

export const initialOrdersState: TOrdersState = {
  data: null,
  loading: false,
  error: false,
  message: null
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialOrdersState,
  reducers: {
    resetOrders: () => initialOrdersState,
    checkOutOrder: (state, action) => {
      state.data?.push(action.payload)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        const { orders, user } = action.payload
        const userOrders = orders.filter((order: TOrder) => order.user === user)
        state.loading = false
        state.data = userOrders
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.message = action.error.message!
        state.loading = false
        state.error = true
      })
  }
})

export const { resetOrders, checkOutOrder } = ordersSlice.actions
export default ordersSlice.reducer
