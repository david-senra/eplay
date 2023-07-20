class Game {
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

export default Game
