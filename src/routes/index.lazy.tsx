import { Suspense, lazy } from 'react';

import { createLazyFileRoute } from '@tanstack/react-router';

import BrujulaBio from '@/modules/landing/components/bio';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';

import DownloadGuides from '@modules/landing/components/downloadGuides';
import HeroSection from '@modules/landing/components/heroSection';
import { SearchModules } from '@modules/landing/components/searchModules';

export const Route = createLazyFileRoute('/')({
  component: LandingPage,
});

const QuotesSlider = lazy(
  () => import('@modules/landing/components/quotesSlider')
);
const BannerAnuncios = lazy(
  () => import('@modules/landing/components/bannerAnuncios')
);
const SeccionAliades = lazy(
  () => import('@modules/landing/components/aliados')
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
      <Suspense fallback={<LoadingSpinner />}>
        <BannerAnuncios />
      </Suspense>
      <div className="bg-primary py-8"></div>
      <Suspense fallback={<LoadingSpinner />}>
        <SeccionAliades />
      </Suspense>
    </>
  );
}
