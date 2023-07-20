import { Link } from 'react-router-dom'
import { HeaderBar, MenuLinks, LinkItem, LinkCart } from './styles'
import logo from '../../assets/images/logo.svg'
import carrinhoImagem from '../../assets/images/carrinho.svg'

const Header = () => (
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
            <a href="#">Novidades</a>
          </LinkItem>
          <LinkItem>
            <a href="#">Promoções</a>
          </LinkItem>
        </MenuLinks>
      </nav>
    </div>
    <LinkCart href="#">
      <div>0 - produto(s)</div>
      <img src={carrinhoImagem} alt="carrinho" />
    </LinkCart>
  </HeaderBar>
)

export default Header
