import { applyFilter } from '../../utils/applyFilter'
import { TAlbumsState, TFilterState } from '../../types/types'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchAlbums = createAsyncThunk('fetch-albums', async (filter: TFilterState) => {
  const request = await fetch('albums.json')
  const response = await request.json()
  if (!request.ok) {
    const { message } = response
    throw new Error(message)
  }

  return { filter, albums: response }
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
    resetAlbums: () => initialAlbumsState,
    decrementStock: (state, action) => {
      const { albumId } = action.payload
      const index = state.data!.findIndex((album) => album.albumId === albumId)
      state.data![index].stock--
    }
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

export const { resetAlbums, decrementStock } = albumSlice.actions
export default albumSlice.reducer
