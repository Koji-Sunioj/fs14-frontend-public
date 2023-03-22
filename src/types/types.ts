import { store } from '../store'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type TAlbum = {
  albumId: string
  albumName: string
  artistName: string
  price: number
  stock: number
  tags: string[]
}

export type TAlbumsState = {
  data: null | TAlbum[]
  error: boolean
  loading: boolean
  message: null | string
  pages: null | number
}

export type TAppState = {
  albums: TAlbumsState
  filter: TFilterState
}

export type TFilterState = {
  sortField: string
  direction: string
  query: null | string
  page: number
}

export type TAlbumPagination = {
  pages: number
  filter: TFilterState
  changePage: (page: number) => void
}

export type TAlbumQuery = {
  loading: boolean
  filter: TFilterState
  buttonRef: React.RefObject<HTMLButtonElement>
  createQuery: (event: React.FormEvent<HTMLFormElement>) => void
  changeSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void
  searchDisable: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export type TAlbumRows = {
  data: TAlbum[] | number[]
  type: string
  query?: null | string
  tagToQuery?: (tag: string) => void
}

export type TAlbumCard = {
  album: TAlbum
  query: null | string
  tagToQuery: (tag: string) => void
}
