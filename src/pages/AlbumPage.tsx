import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../features/filter/filterSlice'
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

  const album = data !== null ? data?.find((album) => album.albumId === albumId) : null
  const isInCart =
    purchases !== null ? purchases.some((purchase) => purchase.albumId === albumId) : false

  let albumName: string,
    artistName: string,
    price: number,
    stock: number,
    tags: string[],
    description: string

  const validAlbum = album !== null && album !== undefined

  if (validAlbum) {
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
    navigate('/')
  }

  return (
    <Row>
      {validAlbum && (
        <Col lg={{ span: 6, offset: 3 }} className="mt-3">
          <Card>
            <Card.Body>
              <Card.Title as={'h5'}>
                {artistName!} - {albumName!}
              </Card.Title>
              <Card.Text>stock: {stock!}</Card.Text>
              <Card.Text>price: &euro;{price!.toFixed(2)}</Card.Text>
              <Card.Text>{description!}</Card.Text>
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
      {album === undefined && <h2>No album matches this URL</h2>}
    </Row>
  )
}

export default AlbumPage
