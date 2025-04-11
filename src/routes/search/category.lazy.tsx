import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { SearchIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';

import categories from '@shared/constants/categories.json';
import { Container } from '@shared/layout/container';
import { replaceSearchTermsFromIndex } from '@shared/utils/busqueda';

import { PorCategorias } from '@modules/search/components/categorias';
import { ReferenceField } from '@modules/search/components/referenceField';

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
            navigate({
              to: '/search',
              search: { [queryType]: parsed, country: 'MX' },
              resetScroll: true,
            });
          })}
          className="flex flex-col items-center justify-center gap-4 rounded-lg bg-primary p-4 font-bold lg:-mx-4 lg:flex-row"
        >
          <ReferenceField
            setValue={(value: string) => setValue('search', value)}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!buscar}
          >
            <SearchIcon />
          </Button>
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
