import anuncios from '@shared/constants/anuncios.json';
import Carusel from '@shared/layout/carusel';
import { AnuncioSlide } from './anuncioSlide';

export const BannerAnuncios = () => {
  return (
    <div
      style={{
        backgroundImage: 'linear-gradient(180deg, #0000 80%, #2D7BBF 80%)',
      }}
    >
      <Carusel>
        {anuncios.map((anuncio, i) => (
          <AnuncioSlide
            imageUrl={anuncio.imageUrl}
            linkUrl={anuncio.linkUrl}
            key={i}
          />
        ))}
      </Carusel>
    </div>
  );
};
