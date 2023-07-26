import styled from 'styled-components'
import { Cores } from '../../styles'
import { HashLink } from 'react-router-hash-link'

export const SectionFooter = styled.div`
  margin-bottom: 64px;
`

export const ContainerFooter = styled.footer`
  margin-top: 40px;
  background-color: ${Cores.cinza};
  padding: 32px 0;
  font-size: 14px;
`

export const FooterTitle = styled.h4`
  color: ${Cores.branca};
  font-size: 16px;
  font-weight: bold;
  padding-top: 40px;
`

export const ListaLinksFooter = styled.ul`
  display: flex;
  margin-top: 16px;
  font-size: 14px;
`

export const LinkFooter = styled(HashLink)`
  color: ${Cores.cinzaClaro};
  text-decoration: none;
  margin-right: 8px;
`
