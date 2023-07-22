import {
  ContainerFooter,
  SectionFooter,
  FooterTitle,
  ListaLinksFooter,
  LinkFooter
} from './styles'

const currentYear = new Date().getFullYear()

const Footer = () => (
  <ContainerFooter>
    <div className="container">
      <SectionFooter>
        <FooterTitle>Categorias</FooterTitle>
        <ListaLinksFooter>
          <li>
            <LinkFooter to="/categorias#rpg">RPG</LinkFooter>
          </li>
          <li>
            <LinkFooter to="/categorias#acao">Ação</LinkFooter>
          </li>
          <li>
            <LinkFooter to="/categorias#esportes">Esportes</LinkFooter>
          </li>
          <li>
            <LinkFooter to="/categorias#simulacao">Simulação</LinkFooter>
          </li>
          <li>
            <LinkFooter to="/categorias#luta">Luta</LinkFooter>
          </li>
        </ListaLinksFooter>
      </SectionFooter>
      <SectionFooter>
        <FooterTitle>Acesso Rápido</FooterTitle>
        <ListaLinksFooter>
          <li>
            <LinkFooter to="/#on-sale">Promoções</LinkFooter>
          </li>
          <li>
            <LinkFooter to="/#coming-soon">Em Breve</LinkFooter>
          </li>
        </ListaLinksFooter>
      </SectionFooter>
      <SectionFooter>
        <FooterTitle>
          {currentYear} - &copy; E-PLAY - Todos os direitos reservados
        </FooterTitle>
      </SectionFooter>
    </div>
  </ContainerFooter>
)

export default Footer
