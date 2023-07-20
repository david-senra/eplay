import styled from 'styled-components'
import { Cores } from '../../styles'
import { Card } from '../Product/styles'
import { PropsSection } from '.'

export const ContainerList = styled.section<
  Omit<PropsSection, 'title' | 'jogos'>
>`
  padding: 32px 0;
  background-color: ${({ fundo }) =>
    fundo === 'preto' ? Cores.preta : Cores.cinza};

  ${Card} {
    background-color: ${({ fundo }) =>
      fundo === 'preto' ? Cores.cinza : Cores.preta};
  }

  p {
    font-size: 14px;
    line-height: 22px;
    max-width: 640px;
  }
`

export const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 40px;
`
