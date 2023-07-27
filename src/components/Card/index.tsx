import * as S from './styles'

type PropsCard = {
  className?: string
  children: JSX.Element
  title: string
}

const Card = ({ children, title, className }: PropsCard) => {
  return (
    <S.Container className={className}>
      <h2>{title}</h2>
      {children}
    </S.Container>
  )
}

export default Card
