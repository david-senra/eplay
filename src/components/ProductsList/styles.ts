import styled from 'styled-components'
import { PropsProductsList } from '.'
import { Cores } from '../../styles'
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
`

export const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
`
