import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Placeholder from 'react-bootstrap/Placeholder'

const AlbumSkeleton = ({ type }: { type: string }) => {
  const size = type === 'list' ? '4' : { span: 6, offset: 3 }
  const className = type === 'list' ? 'mb-3' : 'mt-3'

  return (
    <Col lg={size} className={className}>
      <Card>
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
          {type === 'card' && (
            <>
              <Placeholder as={Card.Text} animation="glow" className="card-p">
                <Placeholder lg={12} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow" className="card-p">
                <Placeholder lg={12} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow" className="card-p">
                <Placeholder lg={12} />
              </Placeholder>
            </>
          )}
          <Placeholder as={Card.Text} animation="glow">
            {[0, 1, 2].map((item) => (
              <Placeholder.Button variant="info" lg={4} style={{ margin: '2px' }} key={item} />
            ))}
          </Placeholder>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default AlbumSkeleton
