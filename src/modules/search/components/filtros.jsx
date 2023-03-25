import { useTranslation } from 'react-i18next';
import RefList from '@shared/constants/RefList.json';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useForm } from 'react-hook-form';
import { Form, useNavigate } from 'react-router-dom';

export const PorFiltros = ({ defaultSearch, setFilters }) => {
  const { t } = useTranslation('search');
  const { setValue, watch, handleSubmit } = useForm({
    defaultValues: {
      search: defaultSearch || '',
    },
  });

  const buscar = watch('search');
  const navigate = useNavigate()

  return (
    <Form
      action="/buscar"
      method="get"
      onSubmit={handleSubmit((values) => {
        if (setFilters !== undefined) {
          return setFilters({ search: values.search })
        }
        navigate(`/buscar?search=${values.search}`)
      })}
      className="grid grid-cols-1 lg:grid-cols-[1fr_min-content]
      gap-4 justify-items-stretch
      bg-primary px-4 py-8 rounded-lg lg:-mx-4"
      style={{ fontWeight: '700' }}
    >
      <input type="hidden" name="search" value={buscar} />
      <ReactSearchAutocomplete
        className="font-bold border-2 border-white bg-transparent
        text-white placeholder:text-white grow"
        styling={{
          backgroundColor: 'rgb(45 123 191 / var(--tw-bg-opacity))',
          fontWeight: '700',
          border: '2px solid #dfe1e5',
          borderColor: 'rgb(237 237 237 / var(--tw-border-opacity))',
          hoverBackgroundColor: 'rgb(27 167 227 / var(--tw-bg-opacity))',
          borderWidth: '2px',
          flexGrow: '1',
          iconColor: 'white',
          borderRadius: '0.375rem',
          placeholderColor: 'white',
          color: 'rgb(237 237 237 / var(--tw-text-opacity))',
          zIndex: 1
        }}
        fuseOptions={{
          threshold: 0.2,
        }}
        placeholder={t('Buscar')}
        items={
          RefList &&
          RefList.map((ref, i) => {
            return { id: ref, name: ref };
          })
        }
        inputSearchString={defaultSearch || ''}
        onSelect={(item) => {
          setValue('search', item.name);
        }}
        onSearch={(keyword, _) => {
          setValue('search', keyword);
        }}
        onClear={() => {
          setValue('search', '')
          !!setFilters && setFilters({ search: '' })
        }}
        showIcon={false}
        showNoResults={true}
        showItemsOnFocus={false}
        showNoResultsText={buscar}
        maxResults={3}
      />
      <input
        type="submit"
        value={t('search')}
        className="px-4 py-2 !bg-white !text-primary"
      />
    </Form>
  );
};
