import { TAlbumsState } from '../../types/types'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchAlbums = createAsyncThunk('fetch-albums', async () => {
  const request = await fetch('/albums.json')
  const response = await request.json()
  if (!request.ok) {
    const { message } = response
    throw new Error(message)
  }
  return { albums: response }
})

const initialAlbumsState: TAlbumsState = {
  data: null,
  loading: false,
  error: false,
  message: null
}

export const albumSlice = createSlice({
  name: 'albums',
  initialState: initialAlbumsState,
  reducers: {
    resetAlbums: () => initialAlbumsState,
    adminAddAlbum: (state, action) => {
      state.data!.unshift(action.payload)
    },
    adminPatchAlbum: (state, action) => {
      const { albumId } = action.payload
      const index = state.data!.findIndex((album) => album.albumId === albumId)
      state.data![index] = action.payload
    },
    adminRemoveAlbum: (state, action) => {
      const albumId = action.payload
      const filtered = state.data?.filter((album) => album.albumId !== albumId)
      state.data = filtered!
    },
    decrementStock: (state, action) => {
      const { albumId } = action.payload
      const index = state.data!.findIndex((album) => album.albumId === albumId)
      state.data![index].stock!--
    },
    incrementStock: (state, action) => {
      const { albumId } = action.payload
      const index = state.data!.findIndex((album) => album.albumId === albumId)
      state.data![index].stock!++
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        const { albums } = action.payload
        state.data = albums
        state.loading = false
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.error.message!
      })
  }
})

export const {
  resetAlbums,
  decrementStock,
  incrementStock,
  adminAddAlbum,
  adminRemoveAlbum,
  adminPatchAlbum
} = albumSlice.actions
export default albumSlice.reducer
