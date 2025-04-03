import { Container } from '@shared/layout/container';
import { useTranslation } from 'react-i18next';
import { NameSearchField } from '@modules/search/components/nameSearchField';
import categories from '@shared/constants/categories.json';
import { PorCategorias } from '@/modules/search/components/categorias';
import { LoginOrProfile } from './loginOrProfile';
import { WorkOutline } from '@mui/icons-material';
import { Link } from '@tanstack/react-router';
import Work from '@/shared/icons/work';

export const SearchModules = () => {
  const { t } = useTranslation(['landing', 'search']);
  return (
    <>
      <Container
        bg="light"
        bodyClass="text-left"
      >
        <h3 className="text-secondary font-bold text-2xl mb-4">
          {t('Buscador')}
        </h3>
        <h3 className="text-primary font-bold text-xl mb-4 lg:text-center">
          {t('contactCTA')}:
        </h3>
        <div className="grid grid-cols-1 gap-8">
          <NameSearchField />
        </div>
        {/* <p className="mb-4 font-bold text-xl text-primary mt-10 lg:text-center">
          {t('Ofrece o consulta empleos')}:
        </p>
        <Link
          to="/jobs"
          className="mx-auto bg-[#cf9f23] w-fit px-8 py-4 rounded-lg text-white font-bold items-center flex flex-row gap-4 text-xl"
        >
          <Work
            fontSize="large"
            className="!size-14"
          />{' '}
          <span className="text-4xl">{t('Bolsa de trabajo')}</span>
        </Link> */}
      </Container>
      <LoginOrProfile />
      <Container
        bg="light"
        className="!py-0 md:py-8"
      >
        <div className="flex justify-center items-center">
          <iframe
            src="https://player.vimeo.com/video/1014498180?autoplay=1&muted=1&controls=0&loop=1"
            width="640"
            height="360"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </Container>
      <Container bg="light">
        <h3 className="text-lg">{t('¿No encuentras lo que buscas?')}</h3>
        <p className="mb-8">
          {t('Intenta buscando entre nuestras categorías')}
        </p>
        <PorCategorias categorias={categories} />
      </Container>
    </>
  );
};
