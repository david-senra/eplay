import { useGetComingSoonQuery, useGetOnSaleQuery } from '../../services/api'
import Banner from '../../components/Banner'
import ProductsList from '../../components/ProductsList'

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
