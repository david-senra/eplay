import * as S from './styles'

const currentYear = new Date().getFullYear()

const Footer = () => (
  <S.ContainerFooter>
    <div className="container">
      <S.SectionFooter>
        <S.FooterTitle>Categorias</S.FooterTitle>
        <S.ListaLinksFooter>
          <li>
            <S.LinkFooter
              title="Clique aqui para acessar jogos de RPG"
              to="/categorias#rpg"
            >
              RPG
            </S.LinkFooter>
          </li>
          <li>
            <S.LinkFooter
              title="Clique aqui para acessar jogos de Ação"
              to="/categorias#acao"
            >
              Ação
            </S.LinkFooter>
          </li>
          <li>
            <S.LinkFooter
              title="Clique aqui para acessar jogos de Esportes"
              to="/categorias#esportes"
            >
              Esportes
            </S.LinkFooter>
          </li>
          <li>
            <S.LinkFooter
              title="Clique aqui para acessar jogos de Simulação"
              to="/categorias#simulacao"
            >
              Simulação
            </S.LinkFooter>
          </li>
          <li>
            <S.LinkFooter
              title="Clique aqui para acessar jogos de Luta"
              to="/categorias#luta"
            >
              Luta
            </S.LinkFooter>
          </li>
        </S.ListaLinksFooter>
      </S.SectionFooter>
      <S.SectionFooter>
        <S.FooterTitle>Acesso Rápido</S.FooterTitle>
        <S.ListaLinksFooter>
          <li>
            <S.LinkFooter
              title="Clique aqui para acessar a seção de Jogos em Promoção"
              to="/#on-sale"
            >
              Promoções
            </S.LinkFooter>
          </li>
          <li>
            <S.LinkFooter
              title="Clique aqui para acessar a seção de jogos que serão lançados em breve"
              to="/#coming-soon"
            >
              Em Breve
            </S.LinkFooter>
          </li>
        </S.ListaLinksFooter>
      </S.SectionFooter>
      <S.SectionFooter>
        <S.FooterTextEnd>
          {currentYear} - &copy; E-PLAY - Todos os direitos reservados
        </S.FooterTextEnd>
      </S.SectionFooter>
    </div>
  </S.ContainerFooter>
)

export default Footer
