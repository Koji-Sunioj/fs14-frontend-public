import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AlbumStatetype, FilterStateType, AlbumType } from '../../types/types'

export const fetchAlbums = createAsyncThunk('fetch-albums', async (filter: FilterStateType) => {
  const request = await fetch('albums.json')
  if (!request.ok) {
    const { message } = await request.json()
    throw new Error(message)
  }
  const albums = await request.json()
  return { filter, albums }
})

const initialAlbumsState: AlbumStatetype = {
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
        let {
          filter: { direction, sortField, query, page },
          albums
        } = action.payload

        if (query !== null) {
          albums = albums.filter(
            (album: AlbumType) =>
              album.albumName.toLowerCase().includes(query!) ||
              album.artistName.toLowerCase().includes(query!) ||
              album.tags.join(' ').toLowerCase().includes(query!)
          )
        }
        const key = sortField as keyof AlbumType
        const next = direction === 'ascending' ? 1 : -1
        const prev = next === 1 ? -1 : 1
        albums.sort((a: AlbumType, b: AlbumType) =>
          a[key] > b[key] ? next : b[key!] > a[key] ? prev : 0
        )

        state.data = albums.slice(page * 6 - 6, page * 6)
        state.loading = false
        state.pages = Math.ceil(albums.length / 6)
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
