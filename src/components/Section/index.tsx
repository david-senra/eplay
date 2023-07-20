import { ContainerList, Title } from './styles'

export type PropsSection = {
  title: string
  fundo: 'preto' | 'cinza'
  children: JSX.Element
}

const Section = ({ title, fundo, children }: PropsSection) => (
  <ContainerList fundo={fundo}>
    <div className="container">
      <Title>{title}</Title>
      {children}
    </div>
  </ContainerList>
)

export default Section
