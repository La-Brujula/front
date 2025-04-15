import React, { useMemo } from 'react';

import { Container } from '@/shared/layout/container';

import anuncios from '@shared/constants/anuncios.json';
import ResponsiveCarousel from '@shared/layout/carusel';

import { AnuncioSlide } from './anuncioSlide';

function BannerAnuncios() {
  const parsedAnuncios = useMemo(
    () =>
      [...anuncios.hero, ...anuncios.bottom]
        .sort(() => Math.random() - 0.5)
        .map((anuncio, i) => (
          <AnuncioSlide
            key={anuncio.linkUrl + '' + i}
            verticalImage={anuncio.verticalImage}
            linkUrl={anuncio.linkUrl}
          />
        )),
    [anuncios]
  );
  return (
    <Container>
      <ResponsiveCarousel>{parsedAnuncios}</ResponsiveCarousel>
    </Container>
  );
}

export default BannerAnuncios;
