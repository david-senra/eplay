import { useGetFeaturedGameQuery } from '../../services/api'
import { formataPreco } from '../../utils'
import { ImagemBanner, TextoBanner, Titulo } from './styles'
import Tag from '../Tag'
import Button from '../Button'
import Loader from '../Loader'

const Banner = () => {
  const { data: gameDestaque } = useGetFeaturedGameQuery()

  if (!gameDestaque) {
    return <Loader />
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
          tipo="hashlink"
          to={`/product/${gameDestaque.id}/#banner`}
          title="Clique aqui para aproveitar esta oferta!"
        >
          Aproveitar
        </Button>
      </div>
    </ImagemBanner>
  )
}

export default Banner
