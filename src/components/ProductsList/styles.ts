import styled from 'styled-components'
import { PropsProductsList } from '.'
import { Cores, breakpoints } from '../../styles'
import { Card } from '../Product/styles'

export const ContainerList = styled.section<
  Omit<PropsProductsList, 'titulo' | 'jogos'>
>`
  padding: 32px 0;
  background-color: ${({ fundo }) =>
    fundo === 'preto' ? Cores.preta : Cores.cinza};

  ${Card} {
    background-color: ${({ fundo }) =>
      fundo === 'preto' ? Cores.cinza : Cores.preta};
  }
`

export const List = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 24px;
  margin-top: 40px;

  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`

export const Item = styled.li`
  @media (max-width: ${breakpoints.desktop}) {
    display: flex;
    justify-content: center;
  }
`

export const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
`
