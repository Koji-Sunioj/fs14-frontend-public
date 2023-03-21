import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AlbumStatetype } from '../../types/types'

export const fetchAlbums = createAsyncThunk('fetch-albums', async () => {
  const request = await fetch('albums.json')
  if (!request.ok) {
    const { message } = await request.json()
    throw new Error(message)
  }
  return await request.json()
})

const initialAlbumsState: AlbumStatetype = {
  data: null,
  loading: false,
  error: false,
  message: null
}

export const albumSlice = createSlice({
  name: 'albums',
  initialState: initialAlbumsState,
  reducers: {
    resetAlbums: () => initialAlbumsState
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.data = action.payload
        state.loading = false
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.error.message!
      })
  }
})

export const { resetAlbums } = albumSlice.actions
export default albumSlice.reducer
