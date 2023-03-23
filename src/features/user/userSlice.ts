import { TUser, TOrder } from '../../types/types'
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

export const initialUserState: TUser = {
  email: null,
  expires: null,
  familyName: null,
  givenName: null,
  picture: null,
  role: null,
  orders: null,
  loading: false,
  error: false,
  message: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    resetUser: () => initialUserState,
    setUser: (state, action) => {
      const { email, exp, family_name, given_name, picture } = action.payload
      const role = email === 'koji.gabriel218@gmail.com' ? 'admin' : 'guest'
      const newUser = {
        email: email,
        expires: exp,
        familyName: family_name,
        givenName: given_name,
        picture: picture,
        role: role
      }
      return { ...state, ...newUser }
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
        state.orders = userOrders
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.message = action.error.message!
        state.loading = false
        state.error = true
      })
  }
})

export const { resetUser, setUser } = userSlice.actions
export default userSlice.reducer
