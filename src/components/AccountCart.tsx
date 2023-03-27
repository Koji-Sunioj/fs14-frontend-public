import { Link } from 'react-router-dom'
import { TAccountCart } from '../types/types'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const AccountCart = ({ purchases, checkOutPurchases }: TAccountCart) => (
  <>
    <h3>Your cart</h3>
    <Row>
      <Col className="mb-3" lg="6">
        <Card>
          <Card.Body>
            {purchases.map((purchase) => {
              const { artistName, albumName, quantity, cost, albumId } = purchase
              return (
                <Card.Text style={{ flex: '3' }} key={albumId}>
                  <Link to={`/album/${albumId}`}>
                    {artistName} - {albumName}
                  </Link>{' '}
                  x {quantity} = &euro;
                  {cost.toFixed(2)}
                </Card.Text>
              )
            })}
            <Card.Text>
              total: &euro;
              {purchases.reduce((sum, purchase) => sum + purchase.cost, 0).toFixed(2)}
            </Card.Text>
            <Button onClick={checkOutPurchases}>Checkout</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </>
)

export default AccountCart
