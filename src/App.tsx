import { BrowserRouter } from 'react-router-dom'

import Rotas from './routes'

import Header from './components/Header'
import { GlobalCSS } from './styles'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <GlobalCSS />
      <div className="container">
        <Header />
      </div>
      <Rotas />
      <Footer />
    </BrowserRouter>
  )
}

export default App
