import AppRoutes from './Routes'
import NavBar from './components/NavBar'

import { GoogleOAuthProvider } from '@react-oauth/google'
import Container from 'react-bootstrap/Container'

const App = () => (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH}>
    <NavBar />
    <Container>
      <AppRoutes />
    </Container>
  </GoogleOAuthProvider>
)

export default App
