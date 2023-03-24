import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../features/cart/cartSlice'
import { decrementStock } from '../features/albums/albumSlice'
import { TAlbumCard, TAppState, AppDispatch } from '../types/types'

import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const AlbumCard = ({ album, tagToQuery }: TAlbumCard) => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    filter: { query },
    user: { email }
  } = useSelector((state: TAppState) => state)
  const { albumName, artistName, stock, price, tags, albumId } = album

  return (
    <Col lg="4" className="mb-3">
      <Card>
        <Card.Body>
          <Card.Title>
            {artistName} - {albumName}
          </Card.Title>
          <Card.Text className="card-p">stock: {stock}</Card.Text>
          <Card.Text className="card-p mb-2">price: &euro;{price.toFixed(2)}</Card.Text>
          <Card.Text>
            {tags.map((tag) => (
              <Button
                size="sm"
                disabled={tag.toLowerCase() === query}
                variant="info"
                style={{ margin: '2px 2px 2px 0px' }}
                key={tag}
                onClick={() => {
                  tagToQuery(tag)
                }}>
                {tag}
              </Button>
            ))}
          </Card.Text>
          <div>
            <Button
              size="sm"
              variant="primary"
              disabled={email === null || stock === 0}
              onClick={() => {
                dispatch(
                  addToCart({
                    albumId: albumId,
                    quantity: 1,
                    artistName: artistName,
                    albumName: albumName,
                    cost: price
                  })
                )
                dispatch(decrementStock({ albumId: albumId }))
              }}>
              Buy
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default AlbumCard
