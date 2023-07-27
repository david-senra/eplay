import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { RootReducer } from '../../store'
import { close, remove } from '../../store/reducers/cart'

import { formataPreco, getTotalPrice } from '../../utils'

import Tag from '../Tag'
import Button from '../Button'
import * as S from './styles'

const Cart = () => {
  const { isOpen, items } = useSelector((state: RootReducer) => state.cart)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const closeCart = () => {
    dispatch(close())
  }

  const removeItem = (id: number) => {
    console.log('hey')
    dispatch(remove(id))
  }

  const goToCheckOut = () => {
    closeCart()
    navigate('/checkout/')
  }

  return (
    <S.DivPrincipal className={isOpen ? 'is-open' : ''}>
      <S.DivOverlay onClick={closeCart} />
      <S.Aside>
        <ul>
          {items.map(({ id, media, name, details, prices }) => (
            <S.CartItem key={id}>
              <img src={media.cover} />
              <div>
                <Tag>{details.category}</Tag>
                <Tag>{details.system}</Tag>
                <h3>{name}</h3>
                <span>{formataPreco(prices.current)}</span>
              </div>
              <button type="button" onClick={() => removeItem(id)} />
            </S.CartItem>
          ))}
        </ul>
        <S.Quantity>
          {items.length === 0
            ? 'Não há nenhum produto no carrinho!'
            : `${items.length} jogo${items.length > 1 ? 's' : ''} no carrinho`}
        </S.Quantity>
        <S.Prices>
          {items.length === 0
            ? ''
            : `Total de ${formataPreco(getTotalPrice(items))}`}
          <span>{items.length === 0 ? '' : 'Em até 6 vezes sem juros!'}</span>
        </S.Prices>
        <Button
          tipo="button"
          title="Clique aqui para continuar com a compra"
          onClick={items.length === 0 ? closeCart : goToCheckOut}
        >
          {items.length > 0 ? 'Prosseguir para o checkout' : 'Fechar'}
        </Button>
      </S.Aside>
    </S.DivPrincipal>
  )
}

export default Cart
