import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootReducer } from '../../store'
import { close, remove } from '../../store/reducers/cart'
import { formataPreco } from '../ProductsList'
import Tag from '../Tag'
import Button from '../Button'
import {
  DivOverlay,
  Aside,
  DivPrincipal,
  Prices,
  Quantity,
  CartItem
} from './styles'

const Cart = () => {
  const { isOpen, items } = useSelector((state: RootReducer) => state.cart)

  const dispatch = useDispatch()

  const closeCart = () => {
    dispatch(close())
  }

  const removeItem = (id: number) => {
    console.log('hey')
    dispatch(remove(id))
  }

  const getTotalPrice = () => {
    return items.reduce((acumulador, valorAtual) => {
      return (acumulador += valorAtual.prices.current
        ? valorAtual.prices.current
        : 0)
    }, 0)
  }

  return (
    <DivPrincipal className={isOpen ? 'is-open' : ''}>
      <DivOverlay onClick={closeCart} />
      <Aside>
        <ul>
          {items.map(({ id, media, name, details, prices }) => (
            <CartItem key={id}>
              <img src={media.cover} />
              <div>
                <h3>{name}</h3>
                <Tag>{details.category}</Tag>
                <Tag>{details.system}</Tag>
                <span>{formataPreco(prices.current)}</span>
              </div>
              <button type="button" onClick={() => removeItem(id)} />
            </CartItem>
          ))}
        </ul>
        <Quantity>{items.length} jogos(s) no carrinho</Quantity>
        <Prices>
          Total de {formataPreco(getTotalPrice())}
          <span>Em até 6 vezes sem juros</span>
        </Prices>
        <Link to="/checkout">
          <Button
            tipo="button"
            title="Clique aqui para continuar com a compra"
            onClick={closeCart}
          >
            Continuar com a compra
          </Button>
        </Link>
      </Aside>
    </DivPrincipal>
  )
}

export default Cart
