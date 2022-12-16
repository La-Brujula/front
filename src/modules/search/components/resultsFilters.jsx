import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import escuelas from '@shared/constants/universidades';
import idiomas from '@shared/constants/languages';

export const ResultsFilter = () => {
  const { register, setValue, getValues } = useForm({
    defaultValues: {
      location: '',
      remote: false,
      fisical: false,
      moral: false,
      category: '',
      language: '',
      gender: '',
      school: '',
      probono: false,
      associations: '',
      recommended: false,
    },
  });
  const { t } = useTranslation('');
  return (
    <form className="flex flex-col gap-8" action="." method="GET">
      <h2 className="text-primary">Filtros</h2>
      <div className="flex flex-col gap-4">
        <select
          className="dark"
          {...register('location')}
          placeholder="Ubicación"
        >
          <option value="">{t('Ubicación')}</option>
        </select>
        <div className="grid grid-cols-[1fr,2rem] items-center text-left border-b border-b-black border-opacity-20">
          <label className="font-normal" htmlFor="remote">
            {t('Remoto')}
          </label>
          <input
            type="checkbox"
            placeholder="remote"
            {...register('remote')}
            className="w-4 h-4 cursor-pointer"
            value="remote"
          />
        </div>
        <div className="grid grid-cols-[1fr,2rem] items-center text-left border-b border-b-black border-opacity-20">
          <label className="font-normal" htmlFor="fisica">
            {t('Persona física')}
          </label>
          <input
            type="checkbox"
            placeholder="fisica"
            {...register('fisica')}
            className="w-4 h-4 cursor-pointer"
            value="fisica"
          />
        </div>
        <div className="grid grid-cols-[1fr,2rem] items-center text-left border-b border-b-black border-opacity-20">
          <label className="font-normal" htmlFor="moral">
            {t('Persona moral')}
          </label>
          <input
            type="checkbox"
            placeholder="moral"
            {...register('moral')}
            className="w-4 h-4 cursor-pointer"
            value="moral"
          />
        </div>
        <select
          className="dark"
          {...register('category')}
          placeholder="Categoría"
        >
          <option value="">{t('Categoría')}</option>
        </select>
        <select className="dark" {...register('language')} placeholder="Idioma">
          <option value="">{t('Idioma')}</option>
          {idiomas.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
        <select className="dark" {...register('gender')} placeholder="Género">
          <option value="">{t('Género')}</option>
        </select>
        <select
          className="dark"
          {...register('school')}
          placeholder="Escuela o universidad"
        >
          <option value="">{t('Escuela o universidad')}</option>
          {escuelas.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
        <div className="grid grid-cols-[1fr,2rem] items-center text-left border-b border-b-black border-opacity-20">
          <label className="font-normal" htmlFor="probono">
            {t('Disponible para servicio social o de becario')}
          </label>
          <input
            type="checkbox"
            placeholder="probono"
            {...register('probono')}
            className="w-4 h-4 cursor-pointer"
            value="probono"
          />
        </div>
        <select
          className="dark"
          {...register('assocations')}
          placeholder="Asociaciones"
        >
          <option value="">{t('Asociaciones')}</option>
        </select>
        <div className="grid grid-cols-[1fr,2rem] items-center text-left border-b border-b-black border-opacity-20">
          <label className="font-normal" htmlFor="recommended">
            {t('Ordenar por recomendaciones')}
          </label>
          <input
            type="checkbox"
            placeholder="recommended"
            {...register('recommended')}
            className="w-4 h-4 cursor-pointer"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <input type="submit" value={t('Ver Resultados')} />
        <p
          className="text-primary cursor-pointer"
          onClick={() => {
            Object.keys(getValues()).forEach((key) => {
              if (typeof getValues()[key] == 'boolean') {
                setValue(key, false);
              } else {
                setValue(key, '');
              }
            });
          }}
        >
          <b>Borrar filtros</b>
        </p>
      </div>
    </form>
  );
};
