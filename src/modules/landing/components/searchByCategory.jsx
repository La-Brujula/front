import { Container } from '@shared/layout/container';
import { useTranslation } from 'react-i18next';
import { PorCategorias } from '@modules/search/components/categorias';
import categories from '@shared/constants/categories';

function SearchByCategory() {
  const { t } = useTranslation('landing');

  return (
    <Container bg="lightblue">
      <h2 className="mb-3">{t('searchByCategory')}</h2>

      <PorCategorias categorias={categories} />
    </Container>
  );
}

export default SearchByCategory;
