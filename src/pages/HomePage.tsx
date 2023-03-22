import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAlbums } from '../features/albums/albumSlice'
import { setFilter, initialFilterState } from '../features/filter/filterSlice'
import { AppState, AppDispatch, FilterStateType } from '../types/types'

import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import Pagination from 'react-bootstrap/Pagination'

import AlbumCard from '../components/AlbumCard'
import AlbumQuery from '../components/AlbumQuery'
import AlbumSkeleton from '../components/AlbumSkeleton'

const HomePage = () => {
  const {
    albums: { data, loading, error, message, pages },
    filter
  } = useSelector((state: AppState) => state)
  const dispatch = useDispatch<AppDispatch>()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const shouldFetch = data === null && !error && !loading

  useEffect(() => {
    shouldFetch && dispatch(fetchAlbums(filter))
  }, [shouldFetch])

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
      const newQuery = { query: query.toLowerCase(), page: 1 }
      const mutatedFilter = Object.assign({ ...filter }, newQuery)
      mutateFilter(mutatedFilter)
    }
  }

  const changePage = (page: number) => {
    const mutatedPage = Object.assign({ ...filter }, { page: page })
    mutateFilter(mutatedPage)
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

    emptyInput && mutateFilter(initialFilterState)
  }

  const shouldLoad = data === null && loading

  return (
    <>
      <AlbumQuery
        filter={filter}
        buttonRef={buttonRef}
        createQuery={createQuery}
        changeSelect={changeSelect}
        searchDisable={searchDisable}
      />
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
      {shouldLoad &&
        [0, 1].map((fakeRow) => (
          <Row key={fakeRow}>
            {[0, 1, 2].map((fakeCol) => (
              <AlbumSkeleton key={fakeCol} />
            ))}
          </Row>
        ))}
      {pages !== null && (
        <Pagination>
          {Array(pages)
            .fill(null)
            .map((index, value) => value + 1)
            .map((page) => (
              <Pagination.Item
                key={page}
                active={page === filter.page}
                onClick={() => {
                  changePage(page)
                }}>
                {page}{' '}
              </Pagination.Item>
            ))}
        </Pagination>
      )}
    </>
  )
}

export default HomePage
