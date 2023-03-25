import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../features/filter/filterSlice'
import { fetchAlbums } from '../features/albums/albumSlice'
import { AppDispatch, TAppState, TPurchase } from '../types/types'
import { addToCart, removeFromCart } from '../features/cart/cartSlice'
import { decrementStock, incrementStock } from '../features/albums/albumSlice'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const AlbumPage = () => {
  const { albumId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const {
    albums: { data, error, loading },
    user: { email },
    cart: { purchases },
    filter
  } = useSelector((state: TAppState) => state)
  const shouldFetch = data === null && !error && !loading

  useEffect(() => {
    shouldFetch && dispatch(fetchAlbums(filter))
  }, [shouldFetch])

  const album = data !== null ? data?.find((album) => album.albumId === albumId) : null
  const isInCart =
    purchases !== null ? purchases.some((purchase) => purchase.albumId === albumId) : false

  let albumName: string,
    artistName: string,
    price: number,
    stock: number,
    tags: string[],
    description: string

  if (album !== null) {
    ;({ albumName, artistName, price, stock, tags, description } = album!)
  }

  const putInCart = (purchase: TPurchase) => {
    const { albumId } = purchase
    dispatch(addToCart(purchase))
    dispatch(decrementStock({ albumId: albumId }))
  }

  const outFromCart = (purchaseParams: Pick<TPurchase, 'albumId' | 'cost'>) => {
    const { albumId, cost } = purchaseParams
    dispatch(
      removeFromCart({
        albumId: albumId,
        cost: cost
      })
    )
    dispatch(incrementStock({ albumId: albumId }))
  }

  const tagToHomeQuery = (tag: string) => {
    const newQuery = { query: tag.toLowerCase(), page: 1 }
    const newFilter = Object.assign({ ...filter }, newQuery)
    dispatch(setFilter(newFilter))
    dispatch(fetchAlbums(newFilter))
    navigate('/')
  }

  return (
    <Row>
      {album !== null && (
        <Col lg={{ span: 6, offset: 3 }} className="mt-3">
          <Card>
            <Card.Body>
              <Card.Title>
                {artistName!} - {albumName!}
              </Card.Title>
              <Card.Text className="card-p">stock: {stock!}</Card.Text>
              <Card.Text className="card-p mb-2">price: &euro;{price!.toFixed(2)}</Card.Text>
              <Card.Text className="card-p mb-2">{description!}</Card.Text>
              <Card.Text>
                {tags!.map((tag) => (
                  <Button
                    onClick={() => {
                      tagToHomeQuery(tag)
                    }}
                    size="sm"
                    variant="info"
                    style={{ margin: '2px 2px 2px 0px' }}
                    key={tag}>
                    {tag}
                  </Button>
                ))}
              </Card.Text>
              <div>
                <Button
                  style={{ marginRight: '2px' }}
                  size="sm"
                  variant="primary"
                  disabled={email === null || stock! === 0}
                  onClick={() => {
                    putInCart({
                      albumId: albumId!,
                      quantity: 1,
                      artistName: artistName,
                      albumName: albumName,
                      cost: price
                    })
                  }}>
                  Add to Cart
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  disabled={email === null || !isInCart}
                  onClick={() => {
                    outFromCart({
                      albumId: albumId!,
                      cost: price
                    })
                  }}>
                  Remove from Cart
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      )}
    </Row>
  )
}

export default AlbumPage
