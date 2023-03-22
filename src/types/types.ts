import { store } from '../store'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type AlbumType = {
  albumId: string
  albumName: string
  artistName: string
  price: number
  stock: number
  tags: string[]
}

export type AlbumStatetype = {
  data: null | AlbumType[]
  error: boolean
  loading: boolean
  message: null | string
}

export type AppState = {
  albums: AlbumStatetype
  filter: FilterStateType
}

export type FilterStateType = {
  sortField: string
  direction: string
  query: null | string
}
