import { ImagemBanner, TextoBanner, Titulo } from './styles'
import Tag from '../Tag'
import Button from '../Button'
import { formataPreco } from '../ProductsList'
import { useGetFeaturedGameQuery } from '../../services/api'

const Banner = () => {
  const { data: gameDestaque, isLoading } = useGetFeaturedGameQuery()

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
