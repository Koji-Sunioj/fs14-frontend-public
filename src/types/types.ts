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

export type TPurchase = Omit<TAlbum, 'tags' | 'stock' | 'price' | 'description'> & {
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
  description: string
  stock: number
  tags: string[]
}

export type TAlbumPagination = {
  loading: boolean
  pages: number
  filter: TFilterState
  changePage: (page: number) => void
}

export type TAccountOrders = {
  orders: TOrder[]
}

export type TAccountCart = {
  purchases: TPurchase[]
  checkOutPurchases: () => void
}

export type TAlbumQuery = {
  loading: boolean
  filter: TFilterState
  buttonRef: React.RefObject<HTMLButtonElement>
  createQuery: (event: React.FormEvent<HTMLFormElement>) => void
  changeSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void
  searchDisable: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export type TAlbumForm = {
  tags: string[]
  album?: null | TAlbum
  tagRef: React.RefObject<HTMLInputElement>
  removeTag: (tag: string) => void
  submitAlbum: (event: React.FormEvent<HTMLFormElement>) => void
  addTag: (event: React.KeyboardEvent<HTMLInputElement>) => void
  beforeAddTag: (event: React.KeyboardEvent<HTMLInputElement>) => void
  setEditTarget: React.Dispatch<React.SetStateAction<string | null>>
}

export type TAdminTable = {
  albums: TAlbum[]
  editTarget: string | null
  removeAlbum: (tag: string) => void
  setTags: React.Dispatch<React.SetStateAction<string[]>>
  setEditTarget: React.Dispatch<React.SetStateAction<string | null>>
}

export type TAlbumRows = {
  data: TAlbum[] | number[]
  type: string
  tagToQuery?: (tag: string) => void
}

export type TAlbumCard = {
  album: TAlbum
  query?: string
  detailed: boolean
  children?: React.ReactNode
  tagToQuery: (tag: string) => void
}
