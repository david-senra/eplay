declare type Jogo = {
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

declare type TipoProdutoCheckout = {
  id: number
  price: number
  nome?: string
}

declare interface GalleryItem {
  type: 'image' | 'video'
  url: string
}

declare type InstallmentsType = {
  quantity: number
  amount: number
  formattedAmount: string
}

declare type PropsButton = {
  tipo: 'button' | 'link' | 'hashlink' | 'submit'
  type?: string
  classe?: string
  title: string
  to?: string
  onClick?: () => void
  children?: string
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

declare type PropsProductsList = {
  titulo: string
  fundo: 'preto' | 'cinza'
  jogos?: Jogo[]
  id?: string
  isLoading: boolean
}

declare class Game {
  titulo: string
  categoria: string
  descricao: string
  sistema: string
  imagem: string
  infos: string[]
  id: number

  constructor(
    id: number,
    titulo: string,
    categoria: string,
    descricao: string,
    sistema: string,
    imagem: string,
    infos: string[]
  ) {
    this.id = id
    this.titulo = titulo
    this.categoria = categoria
    this.descricao = descricao
    this.sistema = sistema
    this.imagem = imagem
    this.infos = infos
  }
}
