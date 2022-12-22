import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import escuelas from '@shared/constants/universidades';
import idiomas from '@shared/constants/languages';
import actividades from '@shared/constants/areas';
import regiones from '@shared/constants/regiones';

export const ResultsFilter = ({ setFilters }) => {
  const { register, setValue, getValues, handleSubmit } = useForm({
    defaultValues: {
      location: '',
      remote: undefined,
      type: '',
      category: '',
      language: '',
      gender: '',
      schools: '',
      socialService: undefined,
      associations: '',
      sortByReviews: undefined,
    },
  });
  const { t } = useTranslation('');

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={handleSubmit((values) => {
        Object.keys(values).forEach((key) => {
          if (typeof values[key] == 'boolean') {
            setValue(key, values[key] || undefined);
          } else {
            setValue(key, '');
          }
        });
        setFilters(values);
      })}
    >
      <h2 className="text-primary">Filtros</h2>
      <div className="flex flex-col gap-4">
        <select className="dark" {...register('state')} placeholder="Ubicación">
          <option value="">{t('Ubicación')}</option>
          {regiones?.map((region) => (
            <optgroup key={region.id} label={region.nombre} value={region.id}>
              {region.estados?.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <div className="grid grid-cols-[1fr,2rem] items-center text-left border-b border-b-black border-opacity-20">
          <label className="font-normal w-full cursor-pointer" htmlFor="remote">
            {t('Remoto')}
          </label>
          <input
            type="checkbox"
            placeholder="remote"
            id="remote"
            {...register('remote')}
            className="w-4 h-4 cursor-pointer"
          />
        </div>
        <div className="grid grid-cols-[1fr,2rem] items-center text-left border-b border-b-black border-opacity-20">
          <label className="font-normal w-full cursor-pointer" htmlFor="fisica">
            {t('Persona física')}
          </label>
          <input
            type="checkbox"
            placeholder="fisica"
            id="fisica"
            {...register('type')}
            className="w-4 h-4 cursor-pointer"
            value="fisica"
          />
        </div>
        <div className="grid grid-cols-[1fr,2rem] items-center text-left border-b border-b-black border-opacity-20">
          <label className="font-normal w-full cursor-pointer" htmlFor="moral">
            {t('Persona moral')}
          </label>
          <input
            type="checkbox"
            placeholder="moral"
            id="moral"
            {...register('type')}
            className="w-4 h-4 cursor-pointer"
            value="moral"
          />
        </div>
        <select className="dark" {...register('area')} placeholder="Categoría">
          <option value="">{t('Categoría')}</option>
          {Object.keys(actividades).map((e) => (
            <option
              key={e}
              value={Object.keys(
                actividades[e][Object.keys(actividades[e])[0]]
              )[0].charAt(0)}
            >
              {e}
            </option>
          ))}
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
          {...register('schools')}
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
          <label className="font-normal w-full cursor-pointer" htmlFor="probono">
            {t('Disponible para servicio social o de becario')}
          </label>
          <input
            type="checkbox"
            placeholder="probono"
            id="probono"
            {...register('socialService')}
            className="w-4 h-4 cursor-pointer"
          />
        </div>
        <div className="grid grid-cols-[1fr,1fr] items-center text-left border-b border-b-black border-opacity-20">
          <label className="font-normal w-full cursor-pointer" htmlFor="associations">
            {t('Asociaciones')}
          </label>
          <input
            type="text"
            placeholder="Asociaciones"
            id="associations"
            {...register('associations')}
            className="w-4 h-4 cursor-pointer"
          />
        </div>
        <div className="grid grid-cols-[1fr,2rem] items-center text-left border-b border-b-black border-opacity-20">
          <label className="font-normal w-full cursor-pointer" htmlFor="recommended">
            {t('Ordenar por recomendaciones')}
          </label>
          <input
            type="checkbox"
            placeholder="recommended"
            id="recommended"
            {...register('sortByReviews')}
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
                setValue(key, undefined);
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
