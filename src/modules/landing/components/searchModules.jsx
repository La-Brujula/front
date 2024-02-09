import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from '@shared/layout/container';
import { NameSearchField } from '../../search/components/nameSearchField';

export const SearchModules = () => {
  const { t } = useTranslation('landing');
  return (
    <Container bg="whitetoblue">
      <p className="text-primary font-bold text-xl mb-4">{t('contactCTA')}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 md:flex-row gap-8">
        <NameSearchField />
        <NavLink
          to="/buscar/category"
          className="button font-bold flex flex-col items-center justify-center
            bg-primary py-8 text-xl"
        >
          {t('Buscar por especialidad')}
        </NavLink>
      </div>
    </Container>
  );
};
