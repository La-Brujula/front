import ResponsiveCarousel from '@shared/layout/carusel';
import { AnuncioSlide } from './anuncioSlide';
import React, { useMemo } from 'react';

function BannerAnuncios(props: {
  anuncios: {
    horizontalImage?: string;
    verticalImage?: string;
    image?: string;
    linkUrl?: string;
  }[];
}) {
  const anuncios = useMemo(
    () =>
      props.anuncios.map((anuncio, i) => (
        <AnuncioSlide
          key={anuncio.linkUrl + '' + i}
          horizontalImage={anuncio.horizontalImage}
          verticalImage={anuncio.verticalImage}
          imageUrl={anuncio.image}
          linkUrl={anuncio.linkUrl}
        />
      )),
    [props.anuncios]
  );
  return <ResponsiveCarousel>{anuncios}</ResponsiveCarousel>;
}

export default React.memo(BannerAnuncios);
