import { Container } from '@shared/layout/container';
import { useTranslation } from 'react-i18next';
import { PorFiltros } from '../../search/components/filtros';

function SearchByQuery() {
  const { t } = useTranslation('landing');
  return (
    <Container bg="whitetoblue">
      <h2 className="mb-2">{t('searchInBrujula')}</h2>
      <p className="text-primary font-bold text-xl mb-4">{t('contactCTA')}</p>
      <PorFiltros />
    </Container>
  );
}

export default SearchByQuery;
