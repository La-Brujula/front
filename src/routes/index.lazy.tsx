import anuncios from '@shared/constants/anuncios.json';
import { lazy } from 'react';
import { SeccionAliades } from '@modules/landing/components/aliados';
import BannerAnuncios from '@modules/landing/components/bannerAnuncios';
import DownloadGuides from '@modules/landing/components/downloadGuides';
import HeroSection from '@modules/landing/components/heroSection';
import { LoginOrProfile } from '@modules/landing/components/loginOrProfile';
import { SearchModules } from '@modules/landing/components/searchModules';
import { createLazyFileRoute } from '@tanstack/react-router';

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
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <BannerAnuncios anuncios={anuncios.hero} />
        <LoginOrProfile />
      </div>
      <SearchModules />
      <DownloadGuides />
      <QuotesSlider />
      <div className="my-8"></div>
      <BannerAnuncios anuncios={anuncios.bottom} />
      <div className="py-8 bg-primary"></div>
      <SeccionAliades />
    </>
  );
}
