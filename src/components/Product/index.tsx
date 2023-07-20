import Tag from '../Tag'
import { Card, Descricao, Titulo, InfosDiv } from './styles'

type PropProduct = {
  titulo: string
  categoria: string
  sistema: string
  descricao: string
  infos: string[]
  imagem: string
  id: number
}

const Product = ({
  titulo,
  categoria,
  sistema,
  descricao,
  infos,
  imagem,
  id
}: PropProduct) => {
  const getDescricao = (descricao: string) => {
    if (descricao.length > 90) {
      return descricao.slice(0, 87) + '...'
    }
    return descricao
  }
  return (
    <Card to={`/product/${id}`}>
      <img src={imagem} alt={titulo} />
      <InfosDiv>
        {infos.map((info) => (
          <Tag key={info}>{info}</Tag>
        ))}
      </InfosDiv>
      <Titulo>{titulo}</Titulo>
      <Tag>{categoria}</Tag>
      <Tag>{sistema}</Tag>
      <Descricao>{getDescricao(descricao)}</Descricao>
    </Card>
  )
}

export default Product
