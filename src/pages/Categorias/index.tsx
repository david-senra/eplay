import ProductsList from '../../components/ProductsList'
import {
  useGetActionGamesQuery,
  useGetFightingGamesQuery,
  useGetRPGGamesQuery,
  useGetSimulationGamesQuery,
  useGetSportsGamesQuery
} from '../../services/api'

const Categorias = () => {
  const { data: jogosAcao } = useGetActionGamesQuery()
  const { data: jogosRPG } = useGetRPGGamesQuery()
  const { data: jogosSimulacao } = useGetSimulationGamesQuery()
  const { data: jogosLuta } = useGetFightingGamesQuery()
  const { data: jogosEsporte } = useGetSportsGamesQuery()

  if (jogosAcao && jogosEsporte && jogosLuta && jogosRPG && jogosSimulacao) {
    return (
      <>
        <ProductsList jogos={jogosAcao} titulo="Ação" fundo="preto" id="acao" />
        <ProductsList jogos={jogosRPG} titulo="RPG" fundo="cinza" id="rpg" />
        <ProductsList
          jogos={jogosSimulacao}
          titulo="Simulação"
          fundo="preto"
          id="simulacao"
        />
        <ProductsList jogos={jogosLuta} titulo="Luta" fundo="cinza" id="luta" />
        <ProductsList
          jogos={jogosEsporte}
          titulo="Esportes"
          fundo="preto"
          id="esportes"
        />
      </>
    )
  }

  return <h2>Carregando</h2>
}

export default Categorias
