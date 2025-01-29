import Input from '@/shared/components/input';
import { SearchOutlined } from '@mui/icons-material';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import countries from '@/shared/constants/countryFlags.json';
import { TFunction } from 'i18next';
import { useCallback } from 'react';

const COUNTRIES = (['MX', 'CO'] as const).map((country) => ({
  key: country,
  label: countries[country],
  className: '!text-5xl',
}));

export const NameSearchField = () => {
  const { t } = useTranslation(['landing', 'countries']);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      search: '',
      location: 'MX',
    },
  });

  const navigate = useNavigate();

  const goToSearch = useCallback(
    () =>
      handleSubmit((values) => {
        navigate({
          to: '/search',
          search: { query: values.search, country: values.location },
          resetScroll: true,
        });
      }),
    [navigate, handleSubmit]
  );

  return (
    <form
      action="/search"
      method="get"
      onSubmit={goToSearch}
      className="grid grid-cols-2 md:grid-cols-[1fr_6rem_5rem]
      gap-4 justify-items-stretch flex-grow w-full
      bg-primary p-4 rounded-lg"
      style={{ fontWeight: '700' }}
    >
      <input
        type="text"
        {...register('search')}
        className="font-bold border-2 col-span-full md:col-span-1 border-white bg-transparent
        text-white placeholder:text-white"
        style={{
          backgroundColor: 'rgb(45 123 191 / var(--tw-bg-opacity))',
          fontWeight: '700',
          border: '2px solid #dfe1e5',
          borderColor: 'rgb(237 237 237 / var(--tw-border-opacity))',
          borderWidth: '2px',
          flexGrow: '1',
          borderRadius: '0.375rem',
          color: 'rgb(237 237 237 / var(--tw-text-opacity))',
          zIndex: 1,
        }}
        placeholder={t('search')}
      />
      <Input
        type="select"
        register={register}
        label={''}
        fieldName="location"
        defaultValue={'MX'}
        items={COUNTRIES}
        inputClass="!text-5xl *:!py-0"
      />
      <button
        type="submit"
        className="text-black bg-white p-4 size-16 rounded-full"
      >
        <SearchOutlined />
      </button>
    </form>
  );
};
