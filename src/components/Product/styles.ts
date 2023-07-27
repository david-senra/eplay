import styled from 'styled-components'
import { Cores } from '../../styles'
import { TagContainer } from '../Tag/styles'
import { HashLink } from 'react-router-hash-link'

export const DivCard = styled.div`
  height: 455px;
  width: 222px;
  text-align: center;
`

export const Card = styled(HashLink)`
  background-color: ${Cores.preta};
  border-radius: 8px;
  padding: 8px;
  position: relative;
  text-decoration: none;
  display: block;
  color: ${Cores.branca};
  width: 100%;
  height: 100%;

  img {
    display: block;
    width: 100%;
    height: 250px;
    object-fit: cover;
  }

  ${TagContainer} {
    margin-right: 8px;
  }
`

export const Titulo = styled.h3`
  font-weight: bold;
  font-size: 16px;
  display: block;
  margin-top: 16px;
  margin-bottom: 8px;
`

export const DivDescricao = styled.div`
  height: 102px;
  width: 100%;
  overflow: hidden;
  white-space: normal;
`

export const Descricao = styled.p`
  font-size: 14px;
  line-height: 22px;
  display: block;
  margin-top: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`

export const InfosDiv = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`
