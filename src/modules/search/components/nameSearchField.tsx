import { SearchOutlined } from '@mui/icons-material';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export const NameSearchField = () => {
  const { t } = useTranslation('landing');
  const { register, handleSubmit } = useForm({
    defaultValues: {
      search: '',
    },
  });

  const navigate = useNavigate();

  return (
    <form
      action="/buscar"
      method="get"
      onSubmit={handleSubmit((values) => {
        navigate({ to: '/', search: { name: values.search } });
      })}
      className="grid grid-cols-[1fr_min-content] lg:grid-cols-[1fr_min-content]
      gap-4 justify-items-stretch flex-grow w-full
      bg-primary p-4 rounded-lg"
      style={{ fontWeight: '700' }}
    >
      <input
        type="text"
        {...register('search')}
        className="font-bold border-2 border-white bg-transparent
        text-white placeholder:text-white grow"
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
        placeholder={t('searchByName')}
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
