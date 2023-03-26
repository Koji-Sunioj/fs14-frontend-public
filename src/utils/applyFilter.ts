import { TFilterState, TAlbum } from '../types/types'

export const applyFilter = (filter: TFilterState, albums: TAlbum[]) => {
  const adminAlbum = localStorage.getItem('adminAlbum')!

  if (adminAlbum !== null) {
    albums.push(JSON.parse(adminAlbum))
  }

  const { query, sortField, direction } = filter
  if (query !== null) {
    albums = albums.filter(
      (album: TAlbum) =>
        album.albumName.toLowerCase().includes(query!) ||
        album.artistName.toLowerCase().includes(query!) ||
        album.tags.join(' ').toLowerCase().includes(query!)
    )
  }
  const key = sortField as keyof TAlbum
  const next = direction === 'ascending' ? 1 : -1
  const prev = next === 1 ? -1 : 1
  const sortedAlbums = albums.sort((a: TAlbum, b: TAlbum) =>
    a[key] > b[key] ? next : b[key!] > a[key] ? prev : 0
  )
  return {
    sortedAlbums,
    pages: Math.ceil(albums.length / 6)
  }
}
