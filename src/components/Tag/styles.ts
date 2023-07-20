import styled from 'styled-components'
import { Cores } from '../../styles'

export type PropsTag = {
  size?: 'small' | 'big'
  children: string
}

export const TagContainer = styled.div<PropsTag>`
  background-color: ${Cores.verde};
  color: ${Cores.branca};
  font-size: ${({ size }) => (size === 'big' ? '16px' : '10px')};
  font-weight: bold;
  padding: ${({ size }) => (size === 'big' ? '8px 16px' : '4px 6px')};
  border-radius: 8px;
  display: inline-block;
`
