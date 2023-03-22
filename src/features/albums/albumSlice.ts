import { applyFilter } from '../../utils/applyFilter'
import { TAlbumsState, TFilterState } from '../../types/types'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchAlbums = createAsyncThunk('fetch-albums', async (filter: TFilterState) => {
  const request = await fetch('albums.json')
  if (!request.ok) {
    const { message } = await request.json()
    throw new Error(message)
  }
  const albums = await request.json()
  return { filter, albums }
})

const initialAlbumsState: TAlbumsState = {
  data: null,
  loading: false,
  error: false,
  message: null,
  pages: null
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
        const { filter, albums } = action.payload
        const { filteredAlbums, pages } = applyFilter(filter, albums)
        state.data = filteredAlbums
        state.loading = false
        state.pages = pages
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
