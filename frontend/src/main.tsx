import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Provider from './components/Provider/Provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider>
      <App/>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>,
)
