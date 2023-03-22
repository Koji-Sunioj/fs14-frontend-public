import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { store } from './store'
import App from './App'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
)