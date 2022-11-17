import { useTranslation } from 'react-i18next';

export const PorFiltros = () => {
  const { t } = useTranslation('search');
  return (
    <form
      action={import.meta.env.BASE_URL + 'buscar'}
      className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_min-content]
      gap-4 justify-items-stretch
      bg-primary px-4 py-8 rounded-lg lg:-mx-4"
    >
      <input
        type="text"
        placeholder={t('search')}
        name="search"
        autoComplete="none"
        className="font-bold border-2 border-white bg-transparent
        text-white placeholder:text-white grow"
      />
      <select
        className="font-bold border-2 border-white bg-transparent
          text-white placeholder:text-white grow"
        name="actividad"
        defaultValue=""
      >
        <option value="" disabled>
          {t('activity')}
        </option>
      </select>
      <select
        className="font-bold border-2 border-white bg-transparent
          text-white placeholder:text-white grow"
        name="region"
        defaultValue=""
      >
        <option value="" disabled>
          {t('region')}
        </option>
      </select>
      <input
        type="submit"
        value={t('search')}
        className="px-4 py-2 !bg-white !text-primary"
      />
    </form>
  );
};
