import { ButtonContainer, ButtonLink } from './styles'

export type PropsButton = {
  tipo: 'button' | 'link' | 'submit'
  type?: string
  title: string
  to?: string
  onClick?: () => void
  children?: string
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

const Button = ({
  type,
  tipo,
  title,
  to,
  onClick,
  children,
  variant = 'primary',
  disabled
}: PropsButton) => {
  if (tipo === 'button' || tipo === 'submit') {
    return (
      <ButtonContainer
        type={type}
        variant={variant}
        tipo={tipo}
        title={title}
        onClick={onClick}
        disabled={disabled}
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
