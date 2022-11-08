import { useTranslation } from 'react-i18next';
import { LoginForm } from '../../auth/components/loginForm';
import DownloadGuides from '../components/downloadGuides';
import HeroSection from '../components/heroSection';
import QuotesSlider from '../components/quotesSlider';
import SearchByCategory from '../components/searchByCategory';
import SearchByQuery from '../components/searchByQuery';

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
        <div className="bg-primary bg-opacity-20 py-8 px-8 grow text-center w-full">
          <h2 className="mb-4">{t('login')}</h2>
          <LoginForm color="lightblue" />
        </div>
      </div>
      <SearchByQuery />
      <SearchByCategory />
      <DownloadGuides />
      <QuotesSlider />
    </>
  );
};
