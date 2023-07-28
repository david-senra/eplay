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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState('')
  const dispatch = useDispatch()
  const { items } = useSelector((state: RootReducer) => state.cart)

  const openCart = () => {
    setIsMobileMenuOpen('closed')
    dispatch(open())
  }

  const closeMenu = () => {
    setIsMobileMenuOpen('closed')
  }

  return (
    <S.HeaderBar>
      <S.HeaderRow>
        <div>
          <S.Hamburger
            onClick={() =>
              setIsMobileMenuOpen(
                isMobileMenuOpen == '' || isMobileMenuOpen == 'closed'
                  ? 'is-open'
                  : 'closed'
              )
            }
          >
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
                  onClick={closeMenu}
                  to="/categorias"
                >
                  Categorias
                </Link>
              </S.LinkItem>
              <S.LinkItem>
                <HashLink
                  title="Clique aqui para acessar a seção de promoções"
                  onClick={closeMenu}
                  to="/#on-sale"
                >
                  Promoções
                </HashLink>
              </S.LinkItem>
              <S.LinkItem>
                <HashLink
                  title="Clique aqui para acessar a seção de jogos que serão lançados em breve"
                  onClick={closeMenu}
                  to="/#coming-soon"
                >
                  Em Breve
                </HashLink>
              </S.LinkItem>
            </S.MenuLinks>
          </nav>
        </div>
        <S.CartButton role="button" onClick={openCart}>
          <div>
            {items.length}
            {items.length === 1 && <span> produto</span>}
            {items.length > 1 && <span> produtos</span>}
          </div>
          <img src={carrinhoImagem} alt="carrinho" />
        </S.CartButton>
      </S.HeaderRow>
      <S.NavMobile
        className={isMobileMenuOpen == '' ? 'initial' : isMobileMenuOpen}
      >
        <S.MenuLinks>
          <S.LinkItem>
            <Link
              title="Clique aqui para acessar a página de categorias"
              to="/categorias"
              onClick={() => setIsMobileMenuOpen('closed')}
            >
              Categorias
            </Link>
          </S.LinkItem>
          <S.LinkItem>
            <HashLink
              title="Clique aqui para acessar a seção de promoções"
              onClick={() => setIsMobileMenuOpen('closed')}
              to="/#on-sale"
            >
              Promoções
            </HashLink>
          </S.LinkItem>
          <S.LinkItem>
            <HashLink
              title="Clique aqui para acessar a seção de jogos que serão lançados em breve"
              onClick={() => setIsMobileMenuOpen('closed')}
              to="/#coming-soon"
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
