import { Jogo } from '../../pages/Home'
import Product from '../Product'
import { ContainerList, List, Item } from './styles'

export type PropsProductsList = {
  titulo: string
  fundo: 'preto' | 'cinza'
  jogos: Jogo[]
  id?: string
}

export const formataPreco = (preco = 0) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(preco)
}

const ProductsList = ({ titulo, fundo, jogos, id }: PropsProductsList) => {
  const GetGameTags = (jogo: Jogo) => {
    const tags = []

    jogo.release_date && tags.push(jogo.release_date)
    if (jogo.prices.discount) {
      tags.push(`${jogo.prices.discount}%`)
      jogo.prices.current && tags.push(formataPreco(jogo.prices.current))
    }

    return tags
  }

  return (
    <ContainerList id={id} fundo={fundo}>
      <div className="container">
        <h2>{titulo}</h2>
        <List>
          {jogos.map((jogo) => (
            <Item key={jogo.id}>
              <Product
                id={jogo.id}
                titulo={jogo.name}
                sistema={jogo.details.system}
                categoria={jogo.details.category}
                descricao={jogo.description}
                imagem={jogo.media.thumbnail}
                infos={GetGameTags(jogo)}
              />
            </Item>
          ))}
        </List>
      </div>
    </ContainerList>
  )
}

export default ProductsList
