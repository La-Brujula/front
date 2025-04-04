import { SearchOutlined } from '@mui/icons-material';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import countries from '@/shared/constants/countryFlags.json';
import { Search } from '@/modules/search/types/searchParams';
import CountrySelect from '@/shared/components/countrySelect';

const COUNTRIES = ['MX', 'CO', 'CL'];

export const NameSearchField = () => {
  const { t } = useTranslation('landing');
  const { register, handleSubmit, setValue, watch } = useForm<Search>({
    defaultValues: {
      query: '',
      country: 'MX',
    },
  });

  const country = watch('country');

  const navigate = useNavigate();

  return (
    <form
      action="/search"
      method="get"
      onSubmit={handleSubmit((values) => {
        navigate({
          to: '/search',
          search: values,
          resetScroll: true,
        });
      })}
      className="grid grid-cols-2 md:grid-cols-[1fr_min-content_min-content]
      gap-4 justify-items-stretch flex-grow w-full
      bg-primary p-4 rounded-lg"
      style={{ fontWeight: '700' }}
    >
      <input
        type="text"
        {...register('query')}
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
      <CountrySelect
        setValue={setValue}
        fieldName="country"
        value={country}
        filterFn={() => ['MX', 'CO', 'CL']}
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
