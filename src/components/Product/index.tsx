import Tag from '../Tag'
import {
  DivCard,
  Card,
  Descricao,
  Titulo,
  InfosDiv,
  DivDescricao
} from './styles'

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
    if (titulo.length > 34) {
      if (descricao.length > 75) {
        return descricao.slice(0, 72) + '...'
      }
      return descricao
    } else {
      if (descricao.length > 100) {
        return descricao.slice(0, 97) + '...'
      }
      return descricao
    }
  }
  return (
    <DivCard>
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
        <DivDescricao>
          <Descricao>{descricao}</Descricao>
        </DivDescricao>
      </Card>
    </DivCard>
  )
}

export default Product
