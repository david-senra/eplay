import { useState } from 'react'
import * as S from './styles'
import Section from '../Section'
import playImg from '../../assets/images/play.png'
import zoomImg from '../../assets/images/zoom.png'
import fecharImg from '../../assets/images/fechar.png'
import { GalleryItem } from '../../pages/Home'

type PropsItem = {
  defaultCover: string
  name: string
  itensGaleria: GalleryItem[]
}

interface ModalState extends GalleryItem {
  isVisible: boolean
}

const Gallery = ({ defaultCover, name, itensGaleria }: PropsItem) => {
  const [modal, setModal] = useState<ModalState>({
    isVisible: false,
    type: 'image',
    url: ''
  })

  const getMediaCover = (item: GalleryItem) => {
    if (item.type === 'image') return item.url
    return defaultCover
  }

  const getMediaIcon = (item: GalleryItem) => {
    if (item.type === 'image') return zoomImg
    return playImg
  }

  const fecharModal = () => {
    setModal({
      isVisible: false,
      type: 'image',
      url: ''
    })
  }

  return (
    <>
      <Section title="Galeria" fundo="preto">
        <S.ListaItems>
          {itensGaleria.map((item, index) => (
            <S.Item
              key={item.url}
              onClick={() => {
                setModal({
                  isVisible: true,
                  type: item.type,
                  url: item.url
                })
              }}
            >
              <img
                src={getMediaCover(item)}
                alt={`Mídia ${index + 1} de ${name}`}
              />
              <S.ActionDiv>
                <img
                  src={getMediaIcon(item)}
                  alt={
                    item.type === 'image'
                      ? 'Clique para maximizar a imagem'
                      : 'Clique para reproduzir o vídeo'
                  }
                />
              </S.ActionDiv>
            </S.Item>
          ))}
        </S.ListaItems>
      </Section>
      <S.Modal className={modal.isVisible ? 'visivel' : ''}>
        <S.ModalContent className="container">
          <header>
            <h4>{name}</h4>
            <img src={fecharImg} alt="Ícone de fechar" onClick={fecharModal} />
          </header>
          {modal.type === 'image' ? (
            <img src={modal.url} alt="" />
          ) : (
            <iframe src={modal.url} />
          )}
        </S.ModalContent>
        <div className="overlay" onClick={fecharModal}></div>
      </S.Modal>
    </>
  )
}

export default Gallery
