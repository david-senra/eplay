import { ButtonContainer, ButtonLink } from './styles'

export type PropsButton = {
  tipo: 'button' | 'link'
  title: string
  to?: string
  onClick?: () => void
  children?: string
  variant?: 'primary' | 'secondary'
}

const Button = ({
  tipo,
  title,
  to,
  onClick,
  children,
  variant = 'primary'
}: PropsButton) => {
  if (tipo === 'button') {
    return (
      <ButtonContainer
        variant={variant}
        tipo="button"
        title={title}
        onClick={onClick}
      >
        {children}
      </ButtonContainer>
    )
  }

  return (
    <ButtonLink to={to as string} title={title}>
      {children}
    </ButtonLink>
  )
}

export default Button
