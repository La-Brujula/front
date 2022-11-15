import { useTranslation } from 'react-i18next';
import { SeccionAliades } from '../components/aliados';
import { BannerAnuncios } from '../components/bannerAnuncios';
import DownloadGuides from '../components/downloadGuides';
import HeroSection from '../components/heroSection';
import SearchByCategory from '../components/searchByCategory';
import SearchByQuery from '../components/searchByQuery';
import { LoginOrProfile } from '../components/loginOrProfile';
import { lazy, useEffect } from 'react';

const QuotesSlider = lazy(() => import('../components/quotesSlider'))

export default () => {
  const { t } = useTranslation('landing');
  
  return (
    <>
      <HeroSection />
      <div className="flex flex-col lg:flex-row">
        <div
          className="grow bg-cover bg-center w-full"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1602981256888-244edc1f444f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80")',
          }}
        ></div>
        <LoginOrProfile />
      </div>
      <SearchByQuery />
      <SearchByCategory />
      <DownloadGuides />
      <QuotesSlider />
      <div className="my-8"></div>
      <BannerAnuncios />
      <div className="py-8 bg-primary"></div>
      <SeccionAliades />
    </>
  );
};
