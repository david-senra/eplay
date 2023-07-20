import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Hero from '../../components/Hero'
import Section from '../../components/Section'
import Gallery from '../../components/Gallery'

import { Jogo } from '../Home'

const Produto = () => {
  const { id } = useParams()
  const [jogoAtual, setJogoAtual] = useState<Jogo>()

  useEffect(() => {
    fetch(`https://fake-api-tau.vercel.app/api/eplay/jogos/${id}`)
      .then((res) => res.json())
      .then((res) => setJogoAtual(res))
  }, [id])

  if (!jogoAtual) {
    return <h3>Carregando...</h3>
  }

  return (
    <>
      <Hero jogo={jogoAtual} />
      <Section title="Sobre o jogo" fundo="preto">
        <p>{jogoAtual.description}</p>
      </Section>
      <Section title="Mais detalhes" fundo="cinza">
        <p>
          <b>Plataforma: </b>
          {jogoAtual.details.system}
          <br />
          <b>Desenvolvedor: </b>
          {jogoAtual.details.developer}
          <br />
          <b>Publisher: </b>
          {jogoAtual.details.publisher}
          <br />
          <b>Idiomas: </b>O jogo oferece suporte a diversos idiomas, incluindo
          {jogoAtual.details.languages.join(', ')}
        </p>
      </Section>
      <Gallery
        name={jogoAtual.name}
        defaultCover={jogoAtual.media.cover}
        itensGaleria={jogoAtual.media.gallery}
      />
    </>
  )
}
export default Produto
