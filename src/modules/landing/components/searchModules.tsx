import { Container } from '@shared/layout/container';
import { useTranslation } from 'react-i18next';
import { NameSearchField } from '@modules/search/components/nameSearchField';
import { Link } from '@tanstack/react-router';

export const SearchModules = () => {
  const { t } = useTranslation('landing');
  return (
    <Container bg="whitetoblue">
      <p className="text-primary font-bold text-xl mb-4">{t('contactCTA')}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 md:flex-row gap-8">
        <NameSearchField />
        <Link
          to="/search/category"
          className="button font-bold flex flex-col items-center justify-center
            bg-primary py-8 text-xl"
        >
          {t('Buscar por especialidad')}
        </Link>
      </div>
    </Container>
  );
};
