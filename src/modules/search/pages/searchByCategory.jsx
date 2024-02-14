import { Container } from '@shared/layout/container';
import { useTranslation } from 'react-i18next';
import { PorCategorias } from '@modules/search/components/categorias';
import categories from '@shared/constants/categories';
import { Form, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ReferenceField } from '../components/referenceField';
import { replaceSearchTermsFromIndex } from '../../../shared/utils/busqueda';
import { SearchOutlined } from '@mui/icons-material';

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
    <>
      <Container bg="lightblue" className="gap-8">
        <h2 className="mb-3">{t('Buscar por especialidad')}</h2>
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
          className="flex flex-col lg:flex-row items-center justify-center
        gap-4 bg-primary p-4 rounded-lg lg:-mx-4 font-bold"
        >
          <ReferenceField setValue={(value) => setValue('search', value)} />
          <button
            type="submit"
            disabled={!buscar}
            className="text-black bg-white p-4 size-16 rounded-full disabled:opacity-50"
          >
            <SearchOutlined />
          </button>
        </Form>
        <div className="my-8"></div>
      </Container>
      <Container>
        <h3 className="mb-3">{t('¿No encuentras lo que buscas?')}</h3>
        <p>{t('Intenta buscando entre nuestras categorías')}</p>
        <div className="my-4"></div>
        <PorCategorias categorias={categories} />
      </Container>
    </>
  );
}

export default SearchByCategory;
