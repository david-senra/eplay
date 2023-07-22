import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Rotas from './routes'

import Header from './components/Header'
import { GlobalCSS } from './styles'
import Footer from './components/Footer'
import { store } from './store'
import Cart from './components/Cart'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalCSS />
        <div className="container">
          <Header />
        </div>
        <Cart />
        <Rotas />
        <Footer />
      </BrowserRouter>
    </Provider>
  )
}

export default App
