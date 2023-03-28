import { TAccountOrders } from '../types/types'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'

const AccountOrders = ({ orders }: TAccountOrders) => (
  <>
    <h3>Your orders</h3>
    <Row>
      {orders?.map((order) => {
        const { orderId, purchaseDate, albums } = order
        const total = albums.reduce((sum, purchase) => sum + purchase.cost, 0).toFixed(2)
        const localDate = new Date(purchaseDate).toLocaleString()
        return (
          <Col lg="6" className="mb-3 fade-in" key={orderId}>
            <Card>
              <Card.Body>
                <Card.Title>order id: {orderId}</Card.Title>
                <Card.Text>date: {localDate}</Card.Text>
                {albums.map((album) => (
                  <Card.Text key={album.albumId}>
                    {album.artistName} - {album.albumName} x {album.quantity} = &euro;
                    {album.cost.toFixed(2)}
                  </Card.Text>
                ))}
                <Card.Text>total: &euro;{total}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )
      })}
    </Row>
  </>
)

export default AccountOrders
