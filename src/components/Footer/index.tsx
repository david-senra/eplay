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
            <LinkFooter>RPG</LinkFooter>
          </li>
          <li>
            <LinkFooter>Aventura</LinkFooter>
          </li>
          <li>
            <LinkFooter>Ação</LinkFooter>
          </li>
          <li>
            <LinkFooter>Esportes</LinkFooter>
          </li>
          <li>
            <LinkFooter>Simulação</LinkFooter>
          </li>
          <li>
            <LinkFooter>Estratégia</LinkFooter>
          </li>
          <li>
            <LinkFooter>FPS</LinkFooter>
          </li>
        </ListaLinksFooter>
      </SectionFooter>
      <SectionFooter>
        <FooterTitle>Acesso Rápido</FooterTitle>
        <ListaLinksFooter>
          <li>
            <LinkFooter>Novidades</LinkFooter>
          </li>
          <li>
            <LinkFooter>Promoções</LinkFooter>
          </li>
          <li>
            <LinkFooter>Em Breve</LinkFooter>
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
