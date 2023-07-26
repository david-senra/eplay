import * as S from './styles'

type PropsCard = {
  children: JSX.Element
  title: string
}

const Card = ({ children, title }: PropsCard) => {
  return (
    <S.Container>
      <h2>{title}</h2>
      {children}
    </S.Container>
  )
}

export default Card
