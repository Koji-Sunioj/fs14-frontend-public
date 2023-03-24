import { store } from '../store'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type TAppState = {
  albums: TAlbumsState
  filter: TFilterState
  user: TUserState
  orders: TOrdersState
  cart: { purchases: TPurchase[] }
}

export type TAlbumsState = {
  data: null | TAlbum[]
  error: boolean
  loading: boolean
  message: null | string
  pages: null | number
}

export type TFilterState = {
  sortField: string
  direction: string
  query: null | string
  page: number
}

export type TUserState = {
  email: null | string
  expires: null | number
  familyName: null | string
  givenName: null | string
  picture: null | string
  role: null | string
}

export type TPurchase = Omit<TAlbum, 'tags' | 'stock' | 'price'> & {
  cost: number
  quantity: number
}

export type TOrdersState = {
  data: null | TOrder[]
  loading: boolean
  error: boolean
  message: string | null
}

export type TOrder = {
  orderId: string
  user: string
  purchaseDate: string
  albums: TPurchase[]
}

export type TAlbum = {
  albumId: string
  albumName: string
  artistName: string
  price: number
  stock: number
  tags: string[]
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
  tagToQuery?: (tag: string) => void
}

export type TAlbumCard = {
  album: TAlbum
  tagToQuery: (tag: string) => void
}
