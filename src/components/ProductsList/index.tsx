import Product from '../Product'
import { formataPreco } from '../../utils'
import * as S from './styles'
import Loader from '../Loader'

const ProductsList = ({
  titulo,
  fundo,
  jogos,
  id,
  isLoading
}: PropsProductsList) => {
  const GetGameTags = (jogo: Jogo) => {
    const tags = []

    jogo.release_date && tags.push(jogo.release_date)
    if (jogo.prices.discount) {
      tags.push(`${jogo.prices.discount}%`)
      jogo.prices.current && tags.push(formataPreco(jogo.prices.current))
    }

    return tags
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <S.ContainerList id={id} fundo={fundo}>
      <div className="container">
        <S.ListTitle>{titulo}</S.ListTitle>
        <S.List>
          {jogos &&
            jogos.map((jogo) => (
              <S.Item key={jogo.id}>
                <Product
                  id={jogo.id}
                  titulo={jogo.name}
                  sistema={jogo.details.system}
                  categoria={jogo.details.category}
                  descricao={jogo.description}
                  imagem={jogo.media.thumbnail}
                  infos={GetGameTags(jogo)}
                />
              </S.Item>
            ))}
        </S.List>
      </div>
    </S.ContainerList>
  )
}

export default ProductsList
