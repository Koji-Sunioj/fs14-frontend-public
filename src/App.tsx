import AppRoutes from './Routes'

import { GoogleOAuthProvider } from '@react-oauth/google'

const App = () => (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH}>
    <AppRoutes />
  </GoogleOAuthProvider>
)

export default App
