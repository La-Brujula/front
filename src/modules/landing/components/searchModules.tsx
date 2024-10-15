import { Container } from '@shared/layout/container';
import { useTranslation } from 'react-i18next';
import { NameSearchField } from '@modules/search/components/nameSearchField';
import categories from '@shared/constants/categories.json';
import { PorCategorias } from '@/modules/search/components/categorias';

export const SearchModules = () => {
  const { t } = useTranslation(['landing', 'search']);
  return (
    <>
      <Container bg="light">
        <h3 className="text-secondary font-bold text-xl mb-4">
          {t('Buscador')}
        </h3>
        <h3 className="text-primary font-bold text-xl mb-4">
          {t('contactCTA')}
        </h3>
        <div className="grid grid-cols-1 gap-8">
          <NameSearchField />
        </div>
      </Container>
      <Container bg="light">
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
