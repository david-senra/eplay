import { useState, useEffect } from 'react'
import { ImagemBanner, TextoBanner, Titulo } from './styles'
import Tag from '../Tag'
import Button from '../Button'
import { Jogo } from '../../pages/Home'
import { formataPreco } from '../ProductsList'

const Banner = () => {
  const [gameDestaque, setGameDestaque] = useState<Jogo>()

  useEffect(() => {
    fetch('https://fake-api-tau.vercel.app/api/eplay/destaque')
      .then((res) => res.json())
      .then((res) => setGameDestaque(res))
  }, [])

  if (!gameDestaque) {
    return <h3>Carregando...</h3>
  }

  return (
    <ImagemBanner
      style={{ backgroundImage: `url(${gameDestaque?.media.cover})` }}
    >
      <div className="container">
        <Tag size="big">Destaque do Dia</Tag>
        <div>
          <Titulo>{gameDestaque.name}</Titulo>
          <TextoBanner>
            De <span>{formataPreco(gameDestaque.prices.old)}</span>
            <br />
            por apenas {formataPreco(gameDestaque.prices.current)}
          </TextoBanner>
        </div>
        <Button
          tipo="link"
          to={`/product/${gameDestaque.id}`}
          title="Clique aqui para aproveitar esta oferta!"
        >
          Aproveitar
        </Button>
      </div>
    </ImagemBanner>
  )
}

export default Banner
