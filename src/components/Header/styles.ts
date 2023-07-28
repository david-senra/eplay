import styled, { keyframes } from 'styled-components'
import { Cores, breakpoints } from '../../styles'

export const MenuLinks = styled.ul`
  display: flex;
  margin-left: 40px;

  @media (max-width: ${breakpoints.tablet}) {
    margin-left: 0;
    display: block;
  }
`

export const HeaderBar = styled.header`
  background-color: ${Cores.cinza};
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 80px;

  a,
  span {
    color: ${Cores.branca};
    text-decoration: none;
    font-weight: bold;
  }
`

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;

    @media (max-width: ${breakpoints.tablet}) {
      flex: 1;
      justify-content: space-between;

      ${MenuLinks} {
        display: none;
      }
    }
  }
`

const comeIn = keyframes`
  from {height: 0}
  to {height: 160px}
`

const comeOut = keyframes`
  from {height: 160px}
  to {height: 0}
`

export const NavMobile = styled.nav`
  display: block;
  overflow: hidden;
  height: 0;

  @media (max-width: ${breakpoints.tablet}) {
    height: 0;
    animation: ${comeOut} 0.8s;

    &.initial {
      animation: ${comeOut} 0;
      height: 0;
    }

    &.is-open {
      animation: ${comeIn} 0.8s;
      height: 160px;
    }
  }
`

export const LinkItem = styled.li`
  margin-right: 16px;

  @media (max-width: ${breakpoints.tablet}) {
    margin-right: 0;

    a {
      display: block;
      padding: 16px 0;
      text-align: center;
    }
  }
`

export const CartButton = styled.span`
  display: flex;
  cursor: pointer;

  img {
    margin-left: 16px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    span {
      display: none;
    }
  }
`

export const Hamburger = styled.div`
  width: 32px;

  span {
    height: 2px;
    display: block;
    width: 100%;
    background-color: ${Cores.branca};
    margin-bottom: 4px;
  }

  @media (min-width: ${breakpoints.tablet}) {
    display: none;
  }
`
