import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import styled from 'styled-components'
import { Cores } from '../../styles'

export const ButtonContainer = styled.button<PropsButton>`
  border: 2px solid
    ${(props) => (props.variant === 'primary' ? Cores.verde : Cores.branca)};
  color: ${Cores.branca};
  background-color: ${(props) =>
    props.variant === 'primary' ? Cores.verde : 'transparent'};
  font-size: 16px;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;

  .is-loading {
    background-color: grey;
  }
`

export const ButtonLink = styled(Link)`
  border: 2px solid ${Cores.branca};
  color: ${Cores.branca};
  background-color: transparent;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
`

export const ButtonHashLink = styled(HashLink)`
  border: 2px solid ${Cores.branca};
  color: ${Cores.branca};
  background-color: transparent;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
`
