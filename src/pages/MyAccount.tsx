import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, TAppState } from '../types/types'
import { resetCart } from '../features/cart/cartSlice'
import { fetchOrders, checkOutOrder } from '../features/orders/ordersSlice'

import { v4 as uuid4 } from 'uuid'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import AccountCart from '../components/AccountCart'
import AccountOrders from '../components/AccountOrders'

const MyAccount = () => {
  const {
    user: { email, givenName, familyName },
    orders: { loading, data, error, message },
    cart: { purchases }
  } = useSelector((state: TAppState) => state)
  const dispatch = useDispatch<AppDispatch>()

  const shouldFetch = data === null && !loading && !error

  useEffect(() => {
    shouldFetch && dispatch(fetchOrders(email!))
  }, [shouldFetch])

  const checkOutPurchases = () => {
    const newOrder = {
      albums: purchases,
      orderId: uuid4(),
      user: email,
      purchaseDate: new Date().toISOString().replace(/\.\d+/, '')
    }
    dispatch(checkOutOrder(newOrder))
    dispatch(resetCart())
  }

  return (
    <>
      <h2 className="mb-3 mt-3">
        Hello {givenName} {familyName}
      </h2>
      {purchases.length > 0 && (
        <AccountCart purchases={purchases} checkOutPurchases={checkOutPurchases} />
      )}
      {data !== null && <AccountOrders orders={data} />}
      {error && <Alert variant="danger">{message}</Alert>}
      {loading && <Spinner animation="grow" variant="primary" />}
    </>
  )
}

export default MyAccount
