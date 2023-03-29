import { Link } from 'react-router-dom'
import { TAlbumCard } from '../types/types'

import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const AlbumCard = ({ album, children, query, detailed, tagToQuery }: TAlbumCard) => {
  const { albumName, artistName, stock, price, tags, albumId, description } = album

  const title = `${artistName} - ${albumName}`
  const colSize = detailed ? { span: 6, offset: 3 } : '4'
  const paddingClass = detailed ? 'mt-3' : 'mb-3'

  return (
    <Col lg={colSize} className={paddingClass}>
      <Card>
        <Card.Body>
          <Card.Title as={'h5'}>
            {detailed ? title : <Link to={`album/${albumId}`}>{title}</Link>}
          </Card.Title>
          <Card.Text>stock: {stock}</Card.Text>
          <Card.Text>price: &euro;{price!.toFixed(2)}</Card.Text>
          {detailed && <Card.Text>{description!}</Card.Text>}
          <Card.Text>
            {tags.map((tag) => (
              <Button
                size="sm"
                disabled={tag.toLowerCase() === query}
                variant="info"
                key={tag}
                onClick={() => {
                  tagToQuery(tag)
                }}>
                {tag}
              </Button>
            ))}
          </Card.Text>
          {children}
        </Card.Body>
      </Card>
    </Col>
  )
}

export default AlbumCard
