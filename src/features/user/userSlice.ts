import { createSlice } from '@reduxjs/toolkit'

import { TUser } from '../../types/types'

export const initialUserState: TUser = {
  email: null,
  expires: null,
  familyName: null,
  givenName: null,
  picture: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    resetUser: () => initialUserState,
    setUser: (state, action) => {
      const { email, exp, family_name, given_name, picture } = action.payload
      const newUser = {
        email: email,
        expires: exp,
        familyName: family_name,
        givenName: given_name,
        picture: picture
      }
      return { ...state, ...newUser }
    }
  }
})

export const { resetUser, setUser } = userSlice.actions
export default userSlice.reducer
