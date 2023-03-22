import { TAlbum, TAlbumRows } from '../types/types'

import Row from 'react-bootstrap/Row'

import AlbumCard from './AlbumCard'
import AlbumSkeleton from './AlbumSkeleton'

const AlbumRows = ({ data, type, tagToQuery, query }: TAlbumRows) => {
  const rowMappings = []

  for (let i = 0; i < data.length; i += 3) {
    rowMappings.push(i)
  }

  return (
    <>
      {type === 'real' &&
        rowMappings.map((rowNumber) => {
          const albumRow = data.slice(rowNumber, rowNumber + 3)
          return (
            <Row key={rowNumber}>
              {albumRow.map((item) => {
                const album = item as TAlbum
                return (
                  <AlbumCard
                    query={query!}
                    album={album}
                    key={album.albumId}
                    tagToQuery={tagToQuery!}
                  />
                )
              })}
            </Row>
          )
        })}
      {type === 'fake' &&
        rowMappings.map((rowNumber) => {
          return (
            <Row key={rowNumber}>
              {[0, 1, 2].map((fakeCol) => (
                <AlbumSkeleton key={fakeCol} />
              ))}
            </Row>
          )
        })}
    </>
  )
}

export default AlbumRows
