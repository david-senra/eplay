import { useDispatch } from 'react-redux'
import { add, open } from '../../store/reducers/cart'
import { Jogo } from '../../pages/Home'
import Button from '../Button'
import Tag from '../Tag'
import * as S from './styles'
import { formataPreco } from '../ProductsList'

type PropsHero = {
  jogo: Jogo
}

const Hero = ({ jogo }: PropsHero) => {
  const dispatch = useDispatch()

  const addToCart = () => {
    dispatch(add(jogo))
    dispatch(open())
  }

  return (
    <S.Banner style={{ backgroundImage: `url(${jogo.media.cover})` }}>
      <div className="container">
        <div>
          <Tag>{jogo.details.category}</Tag>
          <Tag>{jogo.details.system}</Tag>
        </div>

        <S.Infos>
          <h2>{jogo.name}</h2>
          <p>
            {jogo.prices.discount && (
              <span>De {formataPreco(jogo.prices.old)}</span>
            )}
            {jogo.prices.current && (
              <>Por {formataPreco(jogo.prices.current)}</>
            )}
          </p>

          {jogo.prices.current && (
            <Button
              tipo="button"
              title="Clique aqui para adicionar jogo ao carrinho"
              variant="primary"
              onClick={addToCart}
            >
              Adicionar ao Carrinho
            </Button>
          )}
        </S.Infos>
      </div>
    </S.Banner>
  )
}

export default Hero
