import AppRoutes from './Routes'
import Container from 'react-bootstrap/Container'

import NavBar from './components/NavBar'

const App = () => (
  <>
    <NavBar />
    <Container>
      <AppRoutes />
    </Container>
  </>
)

export default App
