import { Container } from '@shared/layout/container';
import { useTranslation } from 'react-i18next';
import { PorFiltros } from '@modules/search/components/filtros';

function SearchByQuery() {
  const { t } = useTranslation('landing');
  return (
    <Container bg="whitetoblue"> 
      <p className="text-primary font-bold text-xl mb-4">{t('contactCTA')}</p>
      <PorFiltros />
    </Container>
  );
}

export default SearchByQuery;
