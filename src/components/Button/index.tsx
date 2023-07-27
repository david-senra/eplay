import { ButtonContainer, ButtonHashLink, ButtonLink } from './styles'

const Button = ({
  type,
  tipo,
  title,
  to,
  classe,
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
        className={classe}
      >
        {children}
      </ButtonContainer>
    )
  } else if (tipo === 'hashlink') {
    return (
      <ButtonHashLink to={to as string} title={title}>
        {children}
      </ButtonHashLink>
    )
  }

  return (
    <ButtonLink to={to as string} title={title}>
      {children}
    </ButtonLink>
  )
}

export default Button
