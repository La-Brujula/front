import { Container } from '@shared/layout/container';
import { useTranslation } from 'react-i18next';
import { PorCategorias } from '@modules/search/components/categorias';
import categories from '@shared/constants/categories';
import { Form, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ReferenceField } from './referenceField';
import { replaceSearchTermsFromIndex } from '../../../shared/utils/busqueda';

function SearchByCategory() {
  const { t } = useTranslation('search');

  const { setValue, watch, handleSubmit } = useForm({
    defaultValues: {
      search: '',
    },
  });

  const buscar = watch('search');
  const navigate = useNavigate();

  return (
    <Container bg="lightblue" className="gap-8">
      <h2 className="mb-3">{t('searchByCategory')}</h2>
      <Form
        action="/buscar"
        onSubmit={handleSubmit((data) => {
          if (!buscar) return false;
          const parsed = replaceSearchTermsFromIndex(buscar);
          const firstId = buscar.split(' ')[0];
          const queryType =
            firstId.length == 1
              ? 'area'
              : firstId.length == 3
              ? 'subarea'
              : 'activity';
          navigate(`/buscar?${queryType}=${parsed}`);
        })}
        className="grid grid-cols-1 lg:grid-cols-[1fr_min-content]
      gap-4 justify-items-stretch flex-grow !max-w-32
      bg-primary px-4 py-8 rounded-lg lg:-mx-4"
        style={{ fontWeight: '700' }}
      >
        <ReferenceField setValue={(value) => setValue('search', value)} />
        <input
          type="submit"
          className="!bg-white !text-primary font-bold
          disabled:!opacity-50 disabled:cursor-not-allowed"
          value={t('search')}
          disabled={!buscar}
        />
      </Form>
      <div className="my-8"></div>
      <PorCategorias categorias={categories} />
    </Container>
  );
}

export default SearchByCategory;
