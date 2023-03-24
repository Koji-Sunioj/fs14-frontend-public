import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrders } from '../features/orders/ordersSlice'
import { AppDispatch, TAppState } from '../types/types'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'

const MyAccount = () => {
  const {
    user: { email, givenName, familyName },
    orders: { loading, data, error }
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

      {shouldRender && <h3>Your orders</h3>}
      {shouldRender && (
        <Row>
          {data?.map((order) => {
            const { orderId, purchaseDate, albums } = order
            const total = albums.reduce((sum, purchase) => sum + purchase.cost, 0).toFixed(2)
            const localDate = new Date(purchaseDate).toLocaleString()
            return (
              <Col lg="4" className="mb-3">
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
      )}
      {loading && <Spinner animation="grow" variant="primary" />}
    </>
  )
}

export default MyAccount
