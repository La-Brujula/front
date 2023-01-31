import { useTranslation } from 'react-i18next';
import RefList from '@shared/constants/RefList.json';
import regiones from '@shared/constants/regiones.json';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useForm } from 'react-hook-form';
import { Form, useNavigate } from 'react-router-dom';

export const PorFiltros = ({ defaultSearch }) => {
  const { t } = useTranslation('search');
  const { register } = useForm({
    defaultValues: {
      search: defaultSearch || '',
    },
  });

  return (
    <Form
      action="/buscar"
      method="get"
      className="grid grid-cols-1 lg:grid-cols-[1fr_min-content]
      gap-4 justify-items-stretch
      bg-primary px-4 py-8 rounded-lg lg:-mx-4"
      style={{ fontWeight: '700' }}
    >
      <input
        type="text"
        placeholder={t('Buscar')}
        {...register('search', { required: false })}
        className="font-bold border-2 border-white bg-transparent
        text-white placeholder:text-white grow"
      />
      <input
        type="submit"
        value={t('search')}
        className="px-4 py-2 !bg-white !text-primary"
      />
    </Form>
  );
};
