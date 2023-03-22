import { useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import { useSelector, useDispatch } from 'react-redux'
import { AppState, AppDispatch, FilterStateType } from '../types/types'
import { setFilter } from '../features/filter/filterSlice'
import { fetchAlbums } from '../features/albums/albumSlice'

import AlbumCard from '../components/AlbumCard'
import AlbumQuery from '../components/AlbumQuery'
import AlbumSkeleton from '../components/AlbumSkeleton'

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    albums: { data, loading, error, message },
    filter
  } = useSelector((state: AppState) => state)
  const shouldFetch = data === null && !error && !loading

  useEffect(() => {
    shouldFetch && dispatch(fetchAlbums(filter))
  })

  const rowMappings = []
  if (data !== null) {
    for (let i = 0; i < data.length; i += 3) {
      rowMappings.push(i)
    }
  }

  const mutateFilter = (newParams: FilterStateType) => {
    dispatch(setFilter(newParams))
    dispatch(fetchAlbums(newParams))
  }

  const changeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      target: { name, value }
    } = event
    const sortObject: { [index: string]: string } = {}
    sortObject[name] = value
    const mutatedFilter = Object.assign({ ...filter }, sortObject)
    mutateFilter(mutatedFilter)
  }

  const createQuery = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const {
      currentTarget: {
        query: { value: query }
      }
    } = event
    if (query.length > 0) {
      const newQuery = { query: query }
      const mutatedFilter = Object.assign({ ...filter }, newQuery)
      mutateFilter(mutatedFilter)
    }
  }
  return (
    <>
      <AlbumQuery filter={filter} changeSelect={changeSelect} createQuery={createQuery} />
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
