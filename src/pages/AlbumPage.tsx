import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../features/filter/filterSlice'
import { AppDispatch, TAlbum, TAppState, TPurchase } from '../types/types'
import { addToCart, removeFromCart } from '../features/cart/cartSlice'
import { decrementStock, incrementStock } from '../features/albums/albumSlice'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

import AlbumCard from '../components/AlbumCard'
import AlbumSkeleton from '../components/AlbumSkeleton'

const AlbumPage = () => {
  const { albumId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const {
    albums: { data, error, loading, message },
    user: { email },
    cart: { purchases },
    filter
  } = useSelector((state: TAppState) => state)

  const album = data !== null ? data?.find((album) => album.albumId === albumId) : null
  const isInCart =
    purchases !== null ? purchases.some((purchase) => purchase.albumId === albumId) : false

  const validAlbum = album !== null && album !== undefined

  const putInCart = (album: TAlbum) => {
    const { albumId, artistName, albumName, price } = album
    const newPurchase = {
      albumId: albumId!,
      artistName: artistName,
      albumName: albumName,
      quantity: 1,
      cost: price
    }
    dispatch(addToCart(newPurchase))
    dispatch(decrementStock({ albumId: albumId }))
  }

  const outFromCart = (album: TAlbum) => {
    const { albumId, price } = album
    dispatch(
      removeFromCart({
        albumId: albumId,
        cost: price
      })
    )
    dispatch(incrementStock({ albumId: albumId }))
  }

  const tagToHomeQuery = (tag: string) => {
    const newQuery = { query: tag.toLowerCase(), page: 1 }
    const newFilter = Object.assign({ ...filter }, newQuery)
    dispatch(setFilter(newFilter))
    navigate('/')
  }

  return (
    <Row>
      {validAlbum && (
        <AlbumCard tagToQuery={tagToHomeQuery} album={album} detailed={true}>
          <div>
            <Button
              style={{ marginRight: '2px' }}
              size="sm"
              variant="primary"
              disabled={email === null || album.stock! === 0}
              onClick={() => {
                putInCart(album)
              }}>
              Add to Cart
            </Button>
            <Button
              size="sm"
              variant="danger"
              disabled={email === null || !isInCart}
              onClick={() => {
                outFromCart(album)
              }}>
              Remove from Cart
            </Button>
          </div>
        </AlbumCard>
      )}
      {loading && <AlbumSkeleton type="card" />}
      {error && (
        <Row>
          <Col lg={{ span: 6, offset: 3 }} className="mt-3">
            <Alert variant="danger">{message}</Alert>
          </Col>
        </Row>
      )}
      {album === undefined && <h2>No album matches this URL</h2>}
    </Row>
  )
}

export default AlbumPage
