import { Suspense, lazy } from 'react';

import { createLazyFileRoute } from '@tanstack/react-router';

import BrujulaBio from '@/modules/landing/components/bio';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';

import anuncios from '@shared/constants/anuncios.json';

import { SeccionAliades } from '@modules/landing/components/aliados';
import BannerAnuncios from '@modules/landing/components/bannerAnuncios';
import DownloadGuides from '@modules/landing/components/downloadGuides';
import HeroSection from '@modules/landing/components/heroSection';
import { SearchModules } from '@modules/landing/components/searchModules';

export const Route = createLazyFileRoute('/')({
  component: LandingPage,
});

const QuotesSlider = lazy(
  () => import('../modules/landing/components/quotesSlider')
);

function LandingPage() {
  return (
    <>
      <HeroSection />
      <SearchModules />
      <DownloadGuides />
      <BrujulaBio />
      <Suspense fallback={<LoadingSpinner />}>
        <QuotesSlider />
      </Suspense>
      <div className="my-8"></div>
      <BannerAnuncios anuncios={[...anuncios.bottom, ...anuncios.hero]} />
      <div className="bg-primary py-8"></div>
      <SeccionAliades />
    </>
  );
}
