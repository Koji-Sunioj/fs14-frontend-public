import { TFilterState, TAlbum } from '../types/types'

export const applyFilter = (filter: TFilterState, albums: TAlbum[]) => {
  let albumsCopy = [...albums]

  const { query, sortField, page, direction } = filter
  if (query !== null) {
    albumsCopy = albumsCopy.filter(
      (album: TAlbum) =>
        album.albumName.toLowerCase().includes(query!) ||
        album.artistName.toLowerCase().includes(query!) ||
        album.tags.join(' ').toLowerCase().includes(query!)
    )
  }
  const pages = Math.ceil(albumsCopy.length / 9)

  const key = sortField as keyof TAlbum
  const next = direction === 'ascending' ? 1 : -1
  const prev = next === 1 ? -1 : 1
  albumsCopy.sort((a: TAlbum, b: TAlbum) =>
    a[key]! > b[key]! ? next : b[key!]! > a[key]! ? prev : 0
  )
  albumsCopy = albumsCopy.slice(page * 9 - 9, page * 9)

  return {
    sortedAlbums: albumsCopy,
    pages: pages
  }
}
