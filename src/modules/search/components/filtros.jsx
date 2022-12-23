import { useTranslation } from 'react-i18next';
import RefList from '@shared/constants/RefList.json';
import regiones from '@shared/constants/regiones.json';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useForm } from 'react-hook-form';
import { Form, useNavigate } from 'react-router-dom';

export const PorFiltros = ({
  defaultSearch,
  defaultActividad,
  defaultState,
}) => {
  const { t } = useTranslation('search');
  const { register, setValue, watch } = useForm({
    defaultValues: {
      search: defaultSearch || '',
      activity: defaultActividad || '',
      region: defaultState || '',
    },
  });

  const actividad = watch('activity');

  const regionBoldIds = [0, 3];

  return (
    <Form
      action="/buscar"
      method="get"
      className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_min-content]
      gap-4 justify-items-stretch
      bg-primary px-4 py-8 rounded-lg lg:-mx-4"
      style={{ fontWeight: '700' }}
    >
      <input
        type="text"
        placeholder={t('Nombre')}
        {...register('search', { required: false })}
        className="font-bold border-2 border-white bg-transparent
        text-white placeholder:text-white grow"
      />
      <input type="hidden" value={actividad} {...register('activity')} />
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
        }}
        placeholder={t('activity')}
        items={
          RefList &&
          RefList.map((ref, i) => {
            return { id: ref, name: ref };
          })
        }
        inputSearchString={defaultActividad || ''}
        onSelect={(item) => {
          setValue('activity', item.name);
        }}
        onClear={() => setValue('activity', '')}
      />

      <select
        className="font-bold border-2 border-white bg-transparent
          text-white placeholder:text-white grow"
        defaultValue=""
        {...register('region', { required: false })}
        placeholder={t('region')}
      >
        <option
          style={{
            backgroundColor: 'rgb(45 123 191 / var(--tw-bg-opacity))',
            fontWeight: '700',
          }}
          value=""
        >
          {t('region')}
        </option>
        {!!regiones &&
          regiones.map((opt) => (
            <option
              style={{
                backgroundColor: 'rgb(45 123 191 / var(--tw-bg-opacity))',
                fontWeight: regionBoldIds.includes(opt.id) ? '700' : '500',
                lineHeight: '24px',
                minHeight: '44px',
              }}
              value={opt.id}
              key={opt.id}
            >
              {opt.nombre}
            </option>
          ))}
      </select>
      <input
        type="submit"
        value={t('search')}
        className="px-4 py-2 !bg-white !text-primary"
      />
    </Form>
  );
};
