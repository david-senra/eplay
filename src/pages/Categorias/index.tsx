import { useState, useEffect } from 'react'
import ProductsList from '../../components/ProductsList'
import { Jogo } from '../Home'

const Categorias = () => {
  const [jogosAcao, setJogosAcao] = useState<Jogo[]>([])
  const [jogosRPG, setJogosRPG] = useState<Jogo[]>([])
  const [jogosSimulacao, setJogosSimulacao] = useState<Jogo[]>([])
  const [jogosLuta, setJogosLuta] = useState<Jogo[]>([])
  const [jogosEsporte, setJogosEsporte] = useState<Jogo[]>([])

  useEffect(() => {
    fetch('https://fake-api-tau.vercel.app/api/eplay/acao')
      .then((res) => res.json())
      .then((res) => setJogosAcao(res))

    fetch('https://fake-api-tau.vercel.app/api/eplay/rpg')
      .then((res) => res.json())
      .then((res) => setJogosRPG(res))

    fetch('https://fake-api-tau.vercel.app/api/eplay/simulacao')
      .then((res) => res.json())
      .then((res) => setJogosSimulacao(res))

    fetch('https://fake-api-tau.vercel.app/api/eplay/luta')
      .then((res) => res.json())
      .then((res) => setJogosLuta(res))

    fetch('https://fake-api-tau.vercel.app/api/eplay/esportes')
      .then((res) => res.json())
      .then((res) => setJogosEsporte(res))
  }, [])

  return (
    <>
      <ProductsList jogos={jogosAcao} titulo="Ação" fundo="preto" />
      <ProductsList jogos={jogosRPG} titulo="RPG" fundo="cinza" />
      <ProductsList jogos={jogosSimulacao} titulo="Simulação" fundo="preto" />
      <ProductsList jogos={jogosLuta} titulo="Luta" fundo="cinza" />
      <ProductsList jogos={jogosEsporte} titulo="Esportes" fundo="preto" />
    </>
  )
}

export default Categorias
