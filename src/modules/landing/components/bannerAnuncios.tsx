import Carusel from '@shared/layout/carusel';
import { AnuncioSlide } from './anuncioSlide';

export const BannerAnuncios = (props: {
  anuncios: {
    horizontalImage?: string;
    verticalImage?: string;
    image?: string;
    linkUrl?: string;
  }[];
}) => {
  return (
    <Carusel>
      {props.anuncios.map((anuncio, i) => (
        <AnuncioSlide
          key={anuncio.linkUrl + '' + i}
          horizontalImage={anuncio.horizontalImage}
          verticalImage={anuncio.verticalImage}
          imageUrl={anuncio.image}
          linkUrl={anuncio.linkUrl}
        />
      ))}
    </Carusel>
  );
};
