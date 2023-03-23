import { TAlbum, TAlbumRows } from '../types/types'

import Row from 'react-bootstrap/Row'

import AlbumCard from './AlbumCard'
import AlbumSkeleton from './AlbumSkeleton'

const AlbumRows = ({ data, type, tagToQuery }: TAlbumRows) => {
  return (
    <>
      {type === 'real' && (
        <Row>
          {data.map((item) => {
            const album = item as TAlbum
            return <AlbumCard album={album} key={album.albumId} tagToQuery={tagToQuery!} />
          })}
        </Row>
      )}
      {type === 'fake' && (
        <Row>
          {data.map((item) => {
            const fakeCol = item as number
            return <AlbumSkeleton key={fakeCol} />
          })}
        </Row>
      )}
    </>
  )
}

export default AlbumRows
