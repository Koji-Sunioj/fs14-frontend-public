import { Link } from 'react-router-dom'
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
          <Card.Title as={'h5'}>
            <Link to={`album/${albumId}`}>
              {artistName} - {albumName}
            </Link>
          </Card.Title>
          <Card.Text>stock: {stock}</Card.Text>
          <Card.Text>price: &euro;{price.toFixed(2)}</Card.Text>
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
        </Card.Body>
      </Card>
    </Col>
  )
}

export default AlbumCard
