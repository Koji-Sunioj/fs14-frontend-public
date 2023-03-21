import AppRoutes from './Routes'
import Container from 'react-bootstrap/Container'

import NavBar from './components/NavBar'

function App() {
  return (
    <>
      <NavBar />
      <Container>
        <AppRoutes />
      </Container>
    </>
  )
}

export default App
