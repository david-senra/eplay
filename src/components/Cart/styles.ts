import styled, { keyframes } from 'styled-components'
import { Cores } from '../../styles'
import { TagContainer } from '../Tag/styles'
import { ButtonContainer } from '../Button/styles'
import fechar from '../../assets/images/fechar.png'

export const DivPrincipal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  z-index: 2;
  visibility: hidden;
  transition: visibility 1s;

  &.is-open {
    display: flex;
    transition: visibility 1s;
    visibility: visible;
  }
`

const fadeIn = keyframes`
  from {opacity: 0}
  to {opacity: 0.7}
`

const fadeOut = keyframes`
  from {opacity: 0.7}
  to {opacity: 0}
`

export const DivOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  z-index: 1;
  animation: ${fadeIn} 0.8s;
  opacity: 0.7;

  &.out-effect {
    animation: ${fadeOut} 0.8s;
    opacity: 0;
  }
`

const enterScreen = keyframes`
  from {
    position: absolute;
    right: -500px
  }
  to {position: absolute;
  right: 0}
`

const exitScreen = keyframes`
from {
  position: absolute;
  right: 0
}
to {position: absolute;
right: -500px}
`

export const Aside = styled.aside`
  background-color: ${Cores.cinza};
  z-index: 2;
  padding: 40px 16px 0 16px;
  max-width: 360px;
  width: 100%;
  animation: ${enterScreen} 0.6s;
  height: 100vh;
  position: absolute;
  right: 0;

  ${ButtonContainer} {
    max-width: 100%;
    width: 100%;
  }

  &.out-effect {
    animation: ${exitScreen} 0.8s;
    position: absolute;
    right: -500px;
  }
`

export const Prices = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: ${Cores.branca};
  margin-bottom: 24px;

  span {
    display: block;
    font-size: 12px;
    color: ${Cores.cinzaClaro};
  }
`

export const Quantity = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: ${Cores.branca};
  margin-top: 32px;
  margin-bottom: 16px;
`

export const CartItem = styled.li`
  display: flex;
  border-bottom: 1px solid ${Cores.cinzaClaro};
  padding: 8px 0;
  position: relative;

  img {
    height: 80px;
    width: 80px;
    object-fit: cover;
    margin-right: 24px;
  }

  h3 {
    font-size: 16px;
    font-weight: bold;
    color: ${Cores.branca};
    margin-bottom: 4px;
  }

  span {
    display: block;
    font-size: 16px;
    font-weight: bold;
    color: ${Cores.branca};
  }

  ${TagContainer} {
    margin-right: 8px;
    margin-top: 4px;
    margin-bottom: 8px;
  }

  button {
    background-image: url(${fechar});
    width: 16px;
    height: 16px;
    border: none;
    background-color: transparent;
    position: absolute;
    top: 8px;
    right: 0;
    cursor: pointer;
  }
`
