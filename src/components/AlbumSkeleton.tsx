import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Placeholder from 'react-bootstrap/Placeholder'

const AlbumSkeleton = () => (
  <Col lg="4" className="mb-3">
    <Card style={{ height: '100%' }}>
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder lg={12} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow" className="card-p">
          <Placeholder lg={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow" className="card-p">
          <Placeholder lg={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          {[0, 1, 2].map((item) => (
            <Placeholder.Button variant="info" lg={4} style={{ margin: '2px' }} key={item} />
          ))}
        </Placeholder>
        <Placeholder.Button variant="primary" lg={2} />
      </Card.Body>
    </Card>
  </Col>
)

export default AlbumSkeleton
