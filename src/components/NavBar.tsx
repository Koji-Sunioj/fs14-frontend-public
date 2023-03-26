import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, TAppState } from '../types/types'
import { resetCart } from '../features/cart/cartSlice'
import { fetchAlbums } from '../features/albums/albumSlice'
import { resetOrders } from '../features/orders/ordersSlice'
import { setUser, resetUser } from '../features/user/userSlice'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { GoogleLogin, CredentialResponse } from '@react-oauth/google'

import jwt_decode from 'jwt-decode'
import Nav from 'react-bootstrap/Nav'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

const NavBar = () => {
  const {
    user: { email, expires, role },
    cart: { purchases },
    albums: { data, error, loading }
  } = useSelector((state: TAppState) => state)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const shouldFetch = data === null && !error && !loading
  const fetchPath =
    ['/', '/admin'].some((path) => path === pathname) || pathname.includes('/album/')

  useEffect(() => {
    shouldFetch && fetchPath && dispatch(fetchAlbums())
  }, [shouldFetch, fetchPath])

  const responseMessage = (response: CredentialResponse) => {
    const decoded = jwt_decode(response.credential!)
    dispatch(setUser(decoded))
  }

  const signOut = () => {
    dispatch(resetUser())
    dispatch(resetCart())
    dispatch(resetOrders())
    if (pathname !== '/') {
      navigate('/')
    }
  }

  const validUser = email !== null && expires! > Math.floor(Date.now() / 1000)
  const isAdmin = validUser && role === 'admin'
  const cartTicks =
    purchases.length > 0 ? purchases.reduce((sum, purchase) => sum + purchase.quantity, 0) : 0

  return (
    <Navbar expand="lg" variant="dark" bg="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Koji's Record Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {validUser && (
              <Nav.Link as={Link} to="/my-account">
                My account{cartTicks > 0 && <Badge bg="danger">{cartTicks}</Badge>}
              </Nav.Link>
            )}
            {isAdmin && (
              <Nav.Link as={Link} to="/admin">
                Admin Panel
              </Nav.Link>
            )}
          </Nav>
          <Nav style={{ width: '20vw', display: 'flex', justifyContent: 'end' }}>
            {validUser ? (
              <Button variant="light" onClick={signOut}>
                Sign out
              </Button>
            ) : (
              <GoogleLogin onSuccess={responseMessage} />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
