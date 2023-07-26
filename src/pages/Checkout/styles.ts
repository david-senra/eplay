import styled from 'styled-components'
import { Cores } from '../../styles'

export type InputType = {
  maxWidth?: string
}

export type LineType = {
  marginTop?: string
}

export type TabButtonType = {
  isActive?: boolean
}

export const Row = styled.div<LineType>`
  display: flex;
  column-gap: 24px;
  margin-top: ${({ marginTop }) => marginTop || '0'};
  align-items: flex-end;
`

export const InputGroup = styled.div<InputType>`
  flex: auto;
  max-width: ${({ maxWidth }) => maxWidth || 'auto'};

  label {
    font-size: 14px;
    margin-bottom: 8px;
    display: block;
  }

  input,
  select {
    background-color: ${Cores.branca};
    border: 1px solid ${Cores.branca};
    height: 32px;
    padding: 0 8px;
    width: 100%;
  }
`

export const TabButton = styled.button<TabButtonType>`
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  color: ${Cores.branca};
  background-color: ${({ isActive }) => (isActive ? Cores.verde : Cores.preta)};
  height: 32px;
  margin-right: 16px;
  padding: 0 8px;
  cursor: pointer;

  img {
    margin-right: 8px;
  }
`
