import { useEffect, useRef } from 'react'
import { applyFilter } from '../utils/applyFilter'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAlbums } from '../features/albums/albumSlice'
import { TAppState, AppDispatch, TAlbum } from '../types/types'
import { setFilter, resetFilter } from '../features/filter/filterSlice'

import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'

import AlbumCard from '../components/AlbumCard'
import AlbumQuery from '../components/AlbumQuery'
import AlbumSkeleton from '../components/AlbumSkeleton'
import AlbumPagination from '../components/AlbumPagination'

const HomePage = () => {
  const {
    albums: { data, loading, error, message },
    filter
  } = useSelector((state: TAppState) => state)
  const dispatch = useDispatch<AppDispatch>()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const changeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      target: { name, value }
    } = event
    const sortObject: { [index: string]: string } = {}
    sortObject[name] = value
    const mutatedFilter = Object.assign({ ...filter }, sortObject)
    dispatch(setFilter(mutatedFilter))
  }

  const createQuery = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const {
      currentTarget: {
        query: { value: query }
      }
    } = event
    if (query.length > 0) {
      const newQuery = { query: query.toLowerCase(), page: 1 }
      const mutatedFilter = Object.assign({ ...filter }, newQuery)
      dispatch(setFilter(mutatedFilter))
    }
  }

  const changePage = (page: number) => {
    const mutatedPage = Object.assign({ ...filter }, { page: page })
    dispatch(setFilter(mutatedPage))
    window.scrollTo(0, 0)
  }

  const searchDisable = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event
    const emptyInput = value.length === 0
    emptyInput
      ? buttonRef.current!.setAttribute('disabled', 'true')
      : buttonRef.current!.removeAttribute('disabled')
    emptyInput && dispatch(resetFilter())
  }

  const tagToQuery = (tag: string) => {
    const newQuery = { query: tag.toLowerCase(), page: 1 }
    const mutatedFilter = Object.assign({ ...filter }, newQuery)
    dispatch(setFilter(mutatedFilter))
  }

  let sortedAlbums: TAlbum[] | null = null,
    pages: number | null = null

  if (data !== null) {
    ;({ sortedAlbums, pages } = applyFilter(filter, data))
  }
  const shouldLoad = data === null && loading

  return (
    <>
      <AlbumQuery
        filter={filter}
        loading={loading}
        buttonRef={buttonRef}
        createQuery={createQuery}
        changeSelect={changeSelect}
        searchDisable={searchDisable}
      />
      {sortedAlbums !== null && (
        <Row>
          {sortedAlbums.map((album) => (
            <AlbumCard tagToQuery={tagToQuery} album={album} key={album.albumId} />
          ))}
        </Row>
      )}
      {shouldLoad && (
        <Row>
          {[0, 1, 2, 3, 4, 5].map((fakeCard) => (
            <AlbumSkeleton key={fakeCard} type="list" />
          ))}
        </Row>
      )}
      {pages !== null && (
        <AlbumPagination loading={loading} pages={pages} filter={filter} changePage={changePage} />
      )}
      {error && <Alert variant="danger">{message}</Alert>}
    </>
  )
}

export default HomePage
