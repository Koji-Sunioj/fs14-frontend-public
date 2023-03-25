import { TAlbumPagination } from '../types/types'

import Pagination from 'react-bootstrap/Pagination'

const AlbumPagination = ({ pages, filter, changePage, loading }: TAlbumPagination) => (
  <Pagination>
    {Array(pages)
      .fill(null)
      .map((index, value) => value + 1)
      .map((page) => (
        <Pagination.Item
          disabled={loading}
          key={page}
          active={page === filter.page}
          onClick={() => {
            changePage(page)
          }}>
          {page}{' '}
        </Pagination.Item>
      ))}
  </Pagination>
)

export default AlbumPagination
