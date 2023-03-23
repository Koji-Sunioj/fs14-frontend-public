import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrders } from '../features/user/userSlice'
import { AppDispatch, TAppState } from '../types/types'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'

const MyAccount = () => {
  const { email, givenName, familyName, orders, loading, error } = useSelector(
    (state: TAppState) => state.user
  )
  const dispatch = useDispatch<AppDispatch>()

  const shouldFetch = orders === null && !loading && !error

  useEffect(() => {
    shouldFetch && dispatch(fetchOrders(email!))
  }, [shouldFetch])

  const shouldRender = orders !== null

  return (
    <>
      <h2 className="mt-3 mb-3">
        Hello {givenName} {familyName}
      </h2>
      {shouldRender && <h3>Your orders</h3>}
      {shouldRender && (
        <Row>
          {orders?.map((order) => (
            <Col lg="4">
              <Card>
                <Card.Body>
                  <Card.Title>order id: {order.orderId}</Card.Title>
                  <Card.Text>date: {order.purchaseDate}</Card.Text>
                  <Card.Text>
                    {order.albums.map((album) => (
                      <p>
                        {album.artistName} - {album.albumName} x {album.quantity} = {album.cost}
                      </p>
                    ))}
                  </Card.Text>
                  <Card.Text>
                    total: {order.albums.reduce((sum, purchase) => sum + purchase.cost, 0)}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default MyAccount
