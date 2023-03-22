import AppRoutes from './Routes'
import NavBar from './components/NavBar'

import Container from 'react-bootstrap/Container'

const App = () => (
  <>
    <NavBar />
    <Container>
      <AppRoutes />
    </Container>
  </>
)

export default App
