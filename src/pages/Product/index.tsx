import { useParams } from 'react-router-dom'
import { useGetPageGameQuery } from '../../services/api'
import Hero from '../../components/Hero'
import Section from '../../components/Section'
import Gallery from '../../components/Gallery'
import Loader from '../../components/Loader'

type TipoGameParams = {
  id: string
}

const Produto = () => {
  const { id } = useParams() as TipoGameParams
  const { data: jogoAtual } = useGetPageGameQuery(id)

  if (!jogoAtual) {
    return <Loader />
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
          <b>Idiomas: </b>O jogo oferece suporte a diversos idiomas, incluindo{' '}
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
