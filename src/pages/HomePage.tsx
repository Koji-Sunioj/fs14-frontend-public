import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAlbums } from '../features/albums/albumSlice'
import { TAppState, AppDispatch, TFilterState } from '../types/types'
import { setFilter, initialFilterState } from '../features/filter/filterSlice'

import Alert from 'react-bootstrap/Alert'

import AlbumRows from '../components/AlbumRows'
import AlbumQuery from '../components/AlbumQuery'
import AlbumPagination from '../components/AlbumPagination'

const HomePage = () => {
  const {
    albums: { data, loading, error, message, pages },
    filter
  } = useSelector((state: TAppState) => state)
  const dispatch = useDispatch<AppDispatch>()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const shouldFetch = data === null && !error && !loading

  useEffect(() => {
    shouldFetch && dispatch(fetchAlbums(filter))
  }, [shouldFetch])

  const mutateFilter = (newParams: TFilterState) => {
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

  const tagToQuery = (tag: string) => {
    const newQuery = { query: tag.toLowerCase(), page: 1 }
    const mutatedFilter = Object.assign({ ...filter }, newQuery)
    mutateFilter(mutatedFilter)
  }

  const shouldLoad = data === null && loading

  console.log('rendered')

  return (
    <>
      <AlbumQuery
        loading={loading}
        filter={filter}
        buttonRef={buttonRef}
        createQuery={createQuery}
        changeSelect={changeSelect}
        searchDisable={searchDisable}
      />
      {data !== null && <AlbumRows data={data} type={'real'} tagToQuery={tagToQuery} />}
      {shouldLoad && <AlbumRows data={[0, 1, 2, 3, 4, 5]} type={'fake'} />}
      {pages !== null && <AlbumPagination pages={pages} filter={filter} changePage={changePage} />}
      {error && <Alert variant="danger">{message}</Alert>}
    </>
  )
}

export default HomePage
