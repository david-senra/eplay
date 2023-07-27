import Tag from '../Tag'
import * as S from './styles'

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
  return (
    <S.DivCard>
      <S.Card
        title={`Clique aqui para ver mais detalhes do jogo: ${titulo}`}
        to={`/product/${id}`}
      >
        <img src={imagem} alt={titulo} />
        <S.InfosDiv>
          {infos.map((info) => (
            <Tag key={info}>{info}</Tag>
          ))}
        </S.InfosDiv>
        <S.Titulo>{titulo}</S.Titulo>
        <Tag>{categoria}</Tag>
        <Tag>{sistema}</Tag>
        <S.DivDescricao>
          <S.Descricao>{descricao}</S.Descricao>
        </S.DivDescricao>
      </S.Card>
    </S.DivCard>
  )
}

export default Product
