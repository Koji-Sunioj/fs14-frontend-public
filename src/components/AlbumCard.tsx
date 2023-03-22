import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import { AlbumType } from '../types/types'

const AlbumCard = ({ album }: { album: AlbumType }) => {
  const { albumName, artistName, stock, price, tags } = album

  return (
    <Col lg="4" className="mb-3">
      <Card style={{ height: '100%' }}>
        <Card.Body>
          <Card.Title>
            {artistName} - {albumName}
          </Card.Title>
          <Card.Text className="card-p">stock: {stock}</Card.Text>
          <Card.Text className="card-p">price: {price}</Card.Text>
          <Card.Text>
            {tags.map((tag) => (
              <Button variant="info" style={{ margin: '2px' }} key={tag}>
                {tag}
              </Button>
            ))}
          </Card.Text>
          <Button variant="primary">Buy</Button>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default AlbumCard
