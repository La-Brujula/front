import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import areas from '@shared/constants/areas';
import regiones from '@shared/constants/regiones';
import genders from '@shared/constants/genders';
import { useState } from 'react';
import languages from '@shared/constants/languages.json';

export const ResultsFilter = ({ setFilters, filters }) => {
  const { register, setValue, getValues, handleSubmit, watch } = useForm({
    defaultValues: filters || {
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
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation('');

  const lang = watch('language')

  return (
    <>
      <div
        className="lg:hidden px-4 py-2 rounded-md bg-primary text-white"
        onClick={() => setIsVisible(!isVisible)}
      >
        Búsqueda Avanzada
      </div>
      <form
        className={[
          'flex flex-col gap-8 transition-all',
          isVisible ? 'h-auto block' : 'h-0 hidden lg:block lg:h-auto',
        ].join(' ')}
        onSubmit={handleSubmit((values) => {
          setFilters(values);
        })}
      >
        <h2 className="text-primary text-xl">Búsqueda Avanzada</h2>
        <div className="flex flex-col gap-4 py-4">
          <select className="dark" {...register('subarea')} placeholder="Actividad">
            <option value="">{t('Actividad')}</option>
            {Object.keys(areas).map((area, i) => (
              <optgroup key={area} label={area}>
                {Object.keys(areas[area]).map((subarea, n) => (
                  <option key={subarea} value={[i + 1, (n + 1).toString().padStart(2, '0')].join('')}>
                    {subarea}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <select
            className="dark"
            {...register('state')}
            placeholder="Ubicación"
            defaultValue={getValues().state}
          >
            <option value="">{t('Ubicación')}</option>
            {regiones?.map((region) => (
              <optgroup key={region.id} label={region.nombre} value={region.id}>
                {region.estados?.map((estado) => (
                  <option key={encodeURI(estado)} value={estado}>
                    {estado}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <div className="grid grid-cols-[1fr,2rem] items-center text-left border-b border-b-black border-opacity-20">
            <label
              className="font-normal w-full cursor-pointer"
              htmlFor="remote"
            >
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
          <select className="dark" {...register('gender')} placeholder="Género">
            <option value="">{t('Género')}</option>
            {genders.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
          <div className="flex flex-col gap-4 w-full">
            <select
              {...register('language')}
              className="w-full dark"
            >
              <option value="">Idioma</option>
              {Object.keys(languages).map((defLang) => (
                <option value={defLang} key={defLang}>
                  {languages[defLang]}
                </option>
              ))}
              <option value="other">Otro</option>
            </select>
            {!!lang && Object.keys(languages).includes(lang) && (
              <input
                type="text"
                onChange={(e) => setValue('language', e.currentTarget.value, { shouldTouch: true })}
                placeholder="Escribe aquí el nombre del idioma"
              />
            )}
          </div>
          <div className="grid grid-cols-[1fr,2rem] items-center text-left border-b border-b-black border-opacity-20">
            <label
              className="font-normal w-full cursor-pointer"
              htmlFor="recommended"
            >
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
              setFilters(getValues());
            }}
          >
            <b>Borrar filtros</b>
          </p>
        </div>
      </form>
    </>
  );
};
