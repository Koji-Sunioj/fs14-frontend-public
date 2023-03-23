import { setUser } from '../features/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, TAppState } from '../types/types'
import { GoogleLogin, CredentialResponse } from '@react-oauth/google'

import jwt_decode from 'jwt-decode'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

const NavBar = () => {
  const { email, expires } = useSelector((state: TAppState) => state.user)
  const dispatch = useDispatch<AppDispatch>()
  const responseMessage = (response: CredentialResponse) => {
    const decoded = jwt_decode(response.credential!)
    dispatch(setUser(decoded))
  }

  const validUser = email !== null && expires! > Math.floor(Date.now() / 1000)

  return (
    <Navbar expand="lg" variant="dark" bg="dark">
      <Container>
        <Navbar.Brand>Koji's Record Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {validUser ? <Button>Sign out</Button> : <GoogleLogin onSuccess={responseMessage} />}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
