import Banner from '../../components/Banner'
import ProductsList from '../../components/ProductsList'
import { useGetComingSoonQuery, useGetOnSaleQuery } from '../../services/api'

export interface GalleryItem {
  type: 'image' | 'video'
  url: string
}

export type Jogo = {
  id: number
  name: string
  description: string
  release_date?: string
  prices: {
    discount?: number
    old?: number
    current?: number
  }
  details: {
    category: string
    system: string
    developer: string
    publisher: string
    languages: string[]
  }
  media: {
    thumbnail: string
    cover: string
    gallery: GalleryItem[]
  }
}

const Home = () => {
  const { data: jogosPromocao } = useGetOnSaleQuery()
  const { data: jogosEmBreve } = useGetComingSoonQuery()

  if (jogosPromocao && jogosEmBreve) {
    return (
      <>
        <Banner />
        <ProductsList
          id={'on-sale'}
          jogos={jogosPromocao}
          titulo="Promoções"
          fundo="cinza"
        />
        <ProductsList
          id={'coming-soon'}
          jogos={jogosEmBreve}
          titulo="Em Breve"
          fundo="preto"
        />
      </>
    )
  }
  return <h2>Carregando...</h2>
}

export default Home
