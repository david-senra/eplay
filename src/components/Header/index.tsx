import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { open } from '../../store/reducers/cart'
import { RootReducer } from '../../store'
import logo from '../../assets/images/logo.svg'
import carrinhoImagem from '../../assets/images/carrinho.svg'
import * as S from './styles'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const { items } = useSelector((state: RootReducer) => state.cart)

  const openCart = () => {
    dispatch(open())
  }

  return (
    <S.HeaderBar>
      <S.HeaderRow>
        <div>
          <S.Hamburger onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <span />
            <span />
            <span />
          </S.Hamburger>
          <S.LinkItem>
            <Link to="/">
              <img src={logo} alt={'eplay'} />
            </Link>
          </S.LinkItem>
          <nav>
            <S.MenuLinks>
              <S.LinkItem>
                <Link
                  title="Clique aqui para acessar a página de categorias"
                  to="/categorias"
                >
                  Categorias
                </Link>
              </S.LinkItem>
              <S.LinkItem>
                <HashLink
                  title="Clique aqui para acessar a seção de promoções"
                  to="/#on-sale"
                >
                  Promoções
                </HashLink>
              </S.LinkItem>
              <S.LinkItem>
                <HashLink
                  title="Clique aqui para acessar a seção de jogos que serão lançados em breve"
                  to="/#coming-soon"
                >
                  Em Breve
                </HashLink>
              </S.LinkItem>
            </S.MenuLinks>
          </nav>
        </div>
        <S.CartButton onClick={openCart}>
          <div>
            {items.length}
            <span> - produto(s)</span>
          </div>
          <img src={carrinhoImagem} alt="carrinho" />
        </S.CartButton>
      </S.HeaderRow>
      <S.NavMobile className={isMobileMenuOpen ? 'is-open' : ''}>
        <S.MenuLinks>
          <S.LinkItem>
            <Link
              title="Clique aqui para acessar a página de categorias"
              to="/categorias"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Categorias
            </Link>
          </S.LinkItem>
          <S.LinkItem>
            <HashLink
              title="Clique aqui para acessar a seção de promoções"
              to="/#on-sale"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Promoções
            </HashLink>
          </S.LinkItem>
          <S.LinkItem>
            <HashLink
              title="Clique aqui para acessar a seção de jogos que serão lançados em breve"
              to="/#coming-soon"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Em Breve
            </HashLink>
          </S.LinkItem>
        </S.MenuLinks>
      </S.NavMobile>
    </S.HeaderBar>
  )
}

export default Header
