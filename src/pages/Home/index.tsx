import { useGetComingSoonQuery, useGetOnSaleQuery } from '../../services/api'
import Banner from '../../components/Banner'
import ProductsList from '../../components/ProductsList'

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
  const { data: jogosPromocao, isLoading: isLoadingSale } = useGetOnSaleQuery()
  const { data: jogosEmBreve, isLoading: isLoadingSoon } =
    useGetComingSoonQuery()

  return (
    <>
      <Banner />
      <ProductsList
        id={'on-sale'}
        jogos={jogosPromocao}
        titulo="Promoções"
        fundo="cinza"
        isLoading={isLoadingSale}
      />
      <ProductsList
        id={'coming-soon'}
        jogos={jogosEmBreve}
        titulo="Em Breve"
        fundo="preto"
        isLoading={isLoadingSoon}
      />
    </>
  )
}

export default Home
