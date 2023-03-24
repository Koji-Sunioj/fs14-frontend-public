import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrders } from '../features/orders/ordersSlice'
import { AppDispatch, TAppState } from '../types/types'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

const MyAccount = () => {
  const {
    user: { email, givenName, familyName },
    orders: { loading, data, error },
    cart: { purchases }
  } = useSelector((state: TAppState) => state)
  const dispatch = useDispatch<AppDispatch>()

  const shouldFetch = data === null && !loading && !error

  useEffect(() => {
    shouldFetch && dispatch(fetchOrders(email!))
  }, [shouldFetch])

  const shouldRender = data !== null

  return (
    <>
      <h2 className="mb-3 mt-3">
        Hello {givenName} {familyName}
      </h2>
      {purchases.length > 0 && (
        <>
          <h3>Your cart</h3>
          <Row>
            <Col className="mb-3" lg="6">
              <Card>
                <Card.Body>
                  {purchases.map((purchase) => {
                    const { artistName, albumName, quantity, cost, albumId } = purchase
                    return (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between'
                        }}>
                        <Card.Text style={{ flex: '3' }}>
                          {artistName} - {albumName} x {quantity} = &euro;
                          {cost.toFixed(2)}
                        </Card.Text>
                        <div style={{ flex: '1', justifyContent: 'flex-end', display: 'flex' }}>
                          <div>
                            <Button variant="danger">&lt;</Button>
                            <Button variant="primary">&gt;</Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <Card.Text>
                    total: &euro;
                    {purchases.reduce((sum, purchase) => sum + purchase.cost, 0).toFixed(2)}
                  </Card.Text>
                  <Button>Checkout</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
      {shouldRender && (
        <>
          <h3>Your orders</h3>
          <Row>
            {data?.map((order) => {
              const { orderId, purchaseDate, albums } = order
              const total = albums.reduce((sum, purchase) => sum + purchase.cost, 0).toFixed(2)
              const localDate = new Date(purchaseDate).toLocaleString()
              return (
                <Col lg="6" className="mb-3" key={orderId}>
                  <Card>
                    <Card.Body>
                      <Card.Title>order id: {orderId}</Card.Title>
                      <Card.Text>date: {localDate}</Card.Text>
                      {albums.map((album) => (
                        <p key={album.albumId}>
                          {album.artistName} - {album.albumName} x {album.quantity} = &euro;
                          {album.cost.toFixed(2)}
                        </p>
                      ))}
                      <Card.Text>total: &euro;{total}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </>
      )}

      {loading && <Spinner animation="grow" variant="primary" />}
    </>
  )
}

export default MyAccount
