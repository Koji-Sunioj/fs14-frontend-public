import { TAppState } from './types/types'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import NavBar from './components/NavBar'
import MyAccount from './pages/MyAccount'
import AlbumPage from './pages/AlbumPage'

const AppRoutes = () => {
  const { email, expires } = useSelector((state: TAppState) => state.user)
  const validUser = email !== null && expires! > Math.floor(Date.now() / 1000)
  return (
    <BrowserRouter>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/album/:albumId" element={<AlbumPage />} />
          {validUser && <Route path="/my-account" element={<MyAccount />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default AppRoutes
