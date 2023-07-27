import styled from 'styled-components'
import { Cores, breakpoints } from '../../styles'

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
  height: 76px;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    height: auto;
    gap: 15px;
  }
`

export const InputGroup = styled.div<InputType>`
  flex: auto;
  max-width: ${({ maxWidth }) => maxWidth || 'auto'};
  height: 100%;

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

    &.error {
      border: 2px solid red;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 100%;
    width: 100%;
  }
`

export const DivEntrega = styled.div`
  padding-top: 24px;

  @media (max-width: ${breakpoints.tablet}) {
    padding-bottom: 24px;
  }
`

export const ErroMensagem = styled.small`
  color: gold;
  font-size: 12px;
`

export const ErroMensagemGeral = styled(ErroMensagem)`
  display: block;
  padding-top: 10px;

  &.is-loading {
    font-size: 16px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    text-align: center;
  }
`

export const DivTabButton = styled.div`
  @media (max-width: ${breakpoints.tablet}) {
    display: flex;
    justify-content: space-between;
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

  @media (max-width: ${breakpoints.tablet}) {
    margin: 0;
    padding: 6px;
    font-size: 10px;
    margin-bottom: 14px;
    width: 140px;
    display: flex;
    align-items: start;
    justify-content: center;
    padding-top: 10px;

    img {
      margin-right: 6px;
    }
  }
`
export const DivButtonFinal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const DivPedido = styled.div`
  width: 300px;
`

export const TituloCompra = styled.h3`
  color: green;
  font-size: 22px;
  width: 300px;
  text-align: center;
  padding-top: 18px;
  margin-top: 18px;
  border-top: 1px solid red;
`

export const TextoPedido = styled.span`
  color: orange;
  padding-left: 10px;
`

export const DivListaProdutos = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  padding-left: 150px;

  p {
    color: greenyellow;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding-left: 0px;
    align-items: end;
  }
`

export const DivTextoProdutos = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`

export const DivNumeroProduto = styled.div`
  display: flex;
  justify-content: space-between;
`

export const DivProduto = styled.div`
  display: flex;
  justify-content: space-between;
  color: gold;

  span,
  p {
    font-size: 14px;
    line-height: 22px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    gap: 20px;
  }
`

export const DivFormaPagamento = styled.div`
  display: flex;
  justify-content: space-between;
`

export const DivPrecoFinal = styled.div`
  display: flex;
  justify-content: space-between;
`

export const TextoPrecoFinal = styled.h4`
  color: #fe8a93;
`

export const ValorPrecoFinal = styled.span`
  color: #8afef5;
`
