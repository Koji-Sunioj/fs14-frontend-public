import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, TAppState } from '../types/types'
import { setUser, resetUser } from '../features/user/userSlice'
import { GoogleLogin, CredentialResponse } from '@react-oauth/google'

import jwt_decode from 'jwt-decode'
import Nav from 'react-bootstrap/Nav'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

const NavBar = () => {
  const {
    user: { email, expires },
    cart: { purchases }
  } = useSelector((state: TAppState) => state)
  const dispatch = useDispatch<AppDispatch>()

  const responseMessage = (response: CredentialResponse) => {
    const decoded = jwt_decode(response.credential!)
    dispatch(setUser(decoded))
  }

  const signOut = () => {
    dispatch(resetUser())
  }

  const validUser = email !== null && expires !== null && expires! > Math.floor(Date.now() / 1000)
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
