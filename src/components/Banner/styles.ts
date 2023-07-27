import styled from 'styled-components'
import { TagContainer } from '../Tag/styles'
import { breakpoints } from '../../styles'

export const ImagemBanner = styled.div`
  position: relative;
  width: 100%;
  height: 560px;
  display: block;
  background-repeat: no-repeat;
  background-size: cover;
  font-weight: bold;

  .container {
    padding-top: 340px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    z-index: 1;

    @media (max-width: ${breakpoints.tablet}) {
      width: 80%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 30px;
    }
  }

  ${TagContainer} {
    position: absolute;
    top: 32px;
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.55);
    content: '';
  }

  @media (max-width: ${breakpoints.tablet}) {
    background-position: center;
  }
`

export const Titulo = styled.h2`
  font-size: 36px;
  max-width: 450px;
`

export const TextoBanner = styled.p`
  font-size: 24px;
  margin-top: 24px;

  span {
    text-decoration: line-through;
  }
`
