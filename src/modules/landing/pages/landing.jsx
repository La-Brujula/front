import anuncios from '@shared/constants/anuncios.json';
import { lazy } from 'react';
import { SeccionAliades } from '../components/aliados';
import { BannerAnuncios } from '../components/bannerAnuncios';
import DownloadGuides from '../components/downloadGuides';
import HeroSection from '../components/heroSection';
import { LoginOrProfile } from '../components/loginOrProfile';
import { SearchModules } from '../components/searchModules';

const QuotesSlider = lazy(() => import('../components/quotesSlider'));

export default () => {
  return (
    <>
      <HeroSection />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <BannerAnuncios
          anuncios={anuncios.hero}
          dots={false}
        />
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
};
