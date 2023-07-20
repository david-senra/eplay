import { useEffect, useState } from 'react'
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
  const [jogosPromocao, setJogosPromocao] = useState<Jogo[]>([])
  const [jogosEmBreve, setJogosEmBreve] = useState<Jogo[]>([])

  useEffect(() => {
    fetch('https://fake-api-tau.vercel.app/api/eplay/promocoes')
      .then((res) => res.json())
      .then((res) => setJogosPromocao(res))

    fetch('https://fake-api-tau.vercel.app/api/eplay/em-breve')
      .then((res) => res.json())
      .then((res) => setJogosEmBreve(res))
  }, [])

  return (
    <>
      <Banner />
      <ProductsList jogos={jogosPromocao} titulo="Promoções" fundo="cinza" />
      <ProductsList jogos={jogosEmBreve} titulo="Em Breve" fundo="preto" />
    </>
  )
}

export default Home
