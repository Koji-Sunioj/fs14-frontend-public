import { useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import { useSelector, useDispatch } from 'react-redux'
import { AppState, AppDispatch } from '../types/types'
import { fetchAlbums } from '../features/albums/albumSlice'

import AlbumCard from '../components/AlbumCard'
import AlbumSkeleton from '../components/AlbumSkeleton'

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { data, loading, error, message } = useSelector((state: AppState) => state.albums)
  const shouldFetch = data === null && !error && !loading

  useEffect(() => {
    shouldFetch && dispatch(fetchAlbums())
  })

  const rowMappings = []
  if (data !== null) {
    for (let i = 0; i < data.length; i += 3) {
      rowMappings.push(i)
    }
  }

  return (
    <>
      <h1>Welcome to the record shop</h1>
      {data !== null &&
        rowMappings.map((rowNumber) => {
          const albumRow = data.slice(rowNumber, rowNumber + 3)
          return (
            <Row key={rowNumber}>
              {albumRow.map((album) => (
                <AlbumCard album={album} key={album.albumId} />
              ))}
            </Row>
          )
        })}
      {error && <Alert variant="danger">{message}</Alert>}
      {loading &&
        [0, 1].map((fakeRow) => (
          <Row key={fakeRow}>
            {[0, 1, 2].map((fakeCol) => (
              <AlbumSkeleton key={fakeCol} />
            ))}
          </Row>
        ))}
    </>
  )
}

export default HomePage
