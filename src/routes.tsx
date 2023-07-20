import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Categorias from './pages/Categorias'
import Produto from './pages/Product'

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/categorias" element={<Categorias />} />
    <Route path="/product/:id" element={<Produto />} />
  </Routes>
)

export default Rotas
