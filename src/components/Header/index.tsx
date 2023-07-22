import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { open } from '../../store/reducers/cart'
import { RootReducer } from '../../store'
import { HeaderBar, MenuLinks, LinkItem, CartButton } from './styles'
import logo from '../../assets/images/logo.svg'
import carrinhoImagem from '../../assets/images/carrinho.svg'
import { HashLink } from 'react-router-hash-link'

const Header = () => {
  const dispatch = useDispatch()
  const { items } = useSelector((state: RootReducer) => state.cart)

  const openCart = () => {
    dispatch(open())
  }

  return (
    <HeaderBar>
      <div>
        <LinkItem>
          <Link to="/">
            <img src={logo} alt={'eplay'} />
          </Link>
        </LinkItem>

        <nav>
          <MenuLinks>
            <LinkItem>
              <Link to="/categorias">Categorias</Link>
            </LinkItem>
            <LinkItem>
              <HashLink to="/#on-sale">Promoções</HashLink>
            </LinkItem>
            <LinkItem>
              <HashLink to="/#coming-soon">Em Breve</HashLink>
            </LinkItem>
          </MenuLinks>
        </nav>
      </div>
      <CartButton onClick={openCart}>
        <div>{items.length} - produto(s)</div>
        <img src={carrinhoImagem} alt="carrinho" />
      </CartButton>
    </HeaderBar>
  )
}

export default Header
