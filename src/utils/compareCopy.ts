import { TAlbum } from '../types/types'

export const compareCopy = (albumCopy: Partial<TAlbum>, album: TAlbum) => {
  const sameAsForm = Object.keys(albumCopy!).some((item) => {
    const valueCopy = albumCopy![item as keyof TAlbum]
    const valueOriginal = album![item as keyof TAlbum]
    if (Array.isArray(valueCopy) && Array.isArray(valueOriginal)) {
      return valueCopy.join(',') !== valueOriginal!.join(',')
    } else {
      return valueCopy !== valueOriginal
    }
  })
  return sameAsForm
}

export const checkNullOREmptyStr = (albumCopy: Partial<TAlbum>) => {
  const hasFalseOrNull = Object.values(albumCopy!).some(
    (item) =>
      (!Array.isArray(item) && item !== null && typeof item === 'string' && item.length === 0) ||
      item === null
  )
  return hasFalseOrNull
}
