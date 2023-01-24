import { SeccionAliades } from '../components/aliados';
import { BannerAnuncios } from '../components/bannerAnuncios';
import anuncios from '@shared/constants/anuncios.json';
import DownloadGuides from '../components/downloadGuides';
import HeroSection from '../components/heroSection';
import SearchByCategory from '../components/searchByCategory';
import SearchByQuery from '../components/searchByQuery';
import { LoginOrProfile } from '../components/loginOrProfile';
import { lazy } from 'react';

const QuotesSlider = lazy(() => import('../components/quotesSlider'));

export default () => {
  return (
    <>
      <HeroSection />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <BannerAnuncios anuncios={anuncios.hero} dots={false} />
        <LoginOrProfile />
      </div>
      <SearchByQuery />
      <SearchByCategory />
      <DownloadGuides />
      <QuotesSlider />
      <div className="my-8"></div>
      <BannerAnuncios anuncios={anuncios.bottom} />
      <div className="py-8 bg-primary"></div>
      <SeccionAliades />
    </>
  );
};
