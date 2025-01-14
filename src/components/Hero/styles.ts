import styled from 'styled-components'
import { Cores, breakpoints } from '../../styles'
import { TagContainer } from '../Tag/styles'

export const Banner = styled.div`
  position: relative;
  display: block;
  height: 480px;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  padding-top: 16px;

  @media (max-width: ${breakpoints.tablet}) {
    background-size: cover;

    ${TagContainer} {
      margin-left: 8px;
    }
  }

  &::after {
    position: absolute;
    background-color: #000;
    opacity: 0.56;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
  }

  .container {
    z-index: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }

  ${TagContainer} {
    margin-right: 8px;
  }
`

export const Infos = styled.div`
  padding: 16px;
  background-color: ${Cores.preta};
  max-width: 290px;
  font-weight: bold;

  h2 {
    font-size: 32px;
  }

  p {
    font-size: 18px;
    margin: 16px 0;

    span {
      display: block;
      text-decoration: line-through;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    background-color: transparent;
  }
`
