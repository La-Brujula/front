import { PorCategorias } from '@modules/search/components/categorias';
import { SearchOutlined } from '@mui/icons-material';
import categories from '@shared/constants/categories.json';
import { Container } from '@shared/layout/container';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { replaceSearchTermsFromIndex } from '@shared/utils/busqueda';
import { ReferenceField } from '@modules/search/components/referenceField';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/search/category')({
  component: SearchByCategory,
});

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
      <Container
        bg="lightblue"
        className="gap-8"
      >
        <h2 className="mb-3">{t('Buscar por especialidad')}</h2>
        <form
          onSubmit={handleSubmit((_) => {
            if (!buscar) return false;
            const parsed = replaceSearchTermsFromIndex(buscar);
            const firstId = buscar.split(' ')[0];
            const queryType =
              firstId.length == 1
                ? 'area'
                : firstId.length == 3
                  ? 'subarea'
                  : 'activity';
            navigate({ to: '/search', search: { [queryType]: parsed } });
          })}
          className="flex flex-col lg:flex-row items-center justify-center
        gap-4 bg-primary p-4 rounded-lg lg:-mx-4 font-bold"
        >
          <ReferenceField
            setValue={(value: string) => setValue('search', value)}
          />
          <button
            type="submit"
            disabled={!buscar}
            className="text-black bg-white p-4 size-16 rounded-full disabled:opacity-50"
          >
            <SearchOutlined />
          </button>
        </form>
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
