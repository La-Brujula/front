import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Form, useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@mui/icons-material';

export const NameSearchField = () => {
  const { t } = useTranslation('search');
  const { register, handleSubmit } = useForm({
    defaultValues: {
      search: '',
    },
  });

  const navigate = useNavigate();

  return (
    <Form
      action="/buscar"
      method="get"
      onSubmit={handleSubmit((values) => {
        navigate(`/buscar?search=${values.search}`);
      })}
      className="grid grid-cols-[1fr_min-content] lg:grid-cols-[1fr_min-content]
      gap-4 justify-items-stretch flex-grow w-full
      bg-primary p-4 rounded-lg"
      style={{ fontWeight: '700' }}
    >
      <input
        type="text"
        name="search"
        {...register('search')}
        className="font-bold border-2 border-white bg-transparent
        text-white placeholder:text-white grow"
        style={{
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
          zIndex: 1,
        }}
        placeholder={t('searchByName')}
      />
      <button type="submit" className="text-black bg-white p-4 rounded-full">
        <SearchOutlined />
      </button>
    </Form>
  );
};
