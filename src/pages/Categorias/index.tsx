import {
  useGetActionGamesQuery,
  useGetFightingGamesQuery,
  useGetRPGGamesQuery,
  useGetSimulationGamesQuery,
  useGetSportsGamesQuery
} from '../../services/api'
import ProductsList from '../../components/ProductsList'

const Categorias = () => {
  const { data: jogosAcao, isLoading: jogosAcaoLoading } =
    useGetActionGamesQuery()
  const { data: jogosRPG, isLoading: jogosRPGLoading } = useGetRPGGamesQuery()
  const { data: jogosSimulacao, isLoading: jogosSimulacaoLoading } =
    useGetSimulationGamesQuery()
  const { data: jogosLuta, isLoading: jogosLutaLoading } =
    useGetFightingGamesQuery()
  const { data: jogosEsporte, isLoading: jogosEsporteLoading } =
    useGetSportsGamesQuery()

  return (
    <>
      <ProductsList
        jogos={jogosAcao}
        isLoading={jogosAcaoLoading}
        titulo="Ação"
        fundo="preto"
        id="acao"
      />
      <ProductsList
        jogos={jogosRPG}
        isLoading={jogosRPGLoading}
        titulo="RPG"
        fundo="cinza"
        id="rpg"
      />
      <ProductsList
        jogos={jogosSimulacao}
        isLoading={jogosSimulacaoLoading}
        titulo="Simulação"
        fundo="preto"
        id="simulacao"
      />
      <ProductsList
        jogos={jogosLuta}
        isLoading={jogosLutaLoading}
        titulo="Luta"
        fundo="cinza"
        id="luta"
      />
      <ProductsList
        jogos={jogosEsporte}
        isLoading={jogosEsporteLoading}
        titulo="Esportes"
        fundo="preto"
        id="esportes"
      />
    </>
  )
}

export default Categorias
