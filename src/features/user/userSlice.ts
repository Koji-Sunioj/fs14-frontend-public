import { TUserState } from '../../types/types'
import { createSlice } from '@reduxjs/toolkit'

export const initialUserState: TUserState = {
  email: null,
  expires: null,
  familyName: null,
  givenName: null,
  picture: null,
  role: null
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
  }
})

export const { resetUser, setUser } = userSlice.actions
export default userSlice.reducer
