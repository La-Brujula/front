import Carusel from '@shared/layout/carusel';
import { AnuncioSlide } from './anuncioSlide';

export const BannerAnuncios = ({ anuncios, dots }) => {
  return (
    <Carusel>
      {anuncios.map((anuncio, i) => (
        <AnuncioSlide
          horizontalImage={anuncio.horizontalImage}
          verticalImage={anuncio.verticalImage}
          imageUrl={anuncio.image}
          linkUrl={anuncio.linkUrl}
          key={i}
        />
      ))}
    </Carusel>
  );
};
