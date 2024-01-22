import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import areas from '@shared/constants/areas';
import regiones from '@shared/constants/regiones';
import genders from '@shared/constants/genders';
import { useEffect, useMemo, useState } from 'react';
import languages from '@shared/constants/languages.json';
import {
  getArea,
  getAreaFromId,
  getSubArea,
  getSubAreaFromId,
  getTitle,
} from '../../../shared/utils/areaUtils';

export const ResultsFilter = ({ setFilters, filters }) => {
  const { register, setValue, getValues, handleSubmit, watch } = useForm({
    defaultValues: {
      ...{
        name: '',
        search: '',
        gender: '',
        schools: '',
        associations: '',
        type: '',
        remote: undefined,
        socialService: undefined,
        sortByReviews: undefined,
        state: '',
        category: '',
        area: '',
        subarea: '',
        activity: '',
      },
      ...filters,
    },
  });

  const area = watch('area');
  const subarea = watch('subarea');
  const activity = watch('activity');

  useMemo(() => {
    const { area, subarea, activity } = getValues();
    const firstActivity = activity.split(' ')[0];
    if (activity.includes(' ')) setValue('activity', firstActivity);
    if (!!area && !!subarea && !!activity) return;
    if (activity) {
      setValue('subarea', firstActivity.slice(0, 3));
      setValue('area', firstActivity[0]);
      return;
    }
    if (subarea) {
      setValue('area', subarea[0]);
      return;
    }
  }, [setValue, subarea, activity]);

  useEffect(() => {
    setFilters(getValues());
  }, [setFilters, area, subarea, activity]);

  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation('');

  return (
    <>
      <div
        className="lg:hidden px-4 py-2 rounded-md bg-primary text-white cursor-pointer"
        onClick={() => setIsVisible(!isVisible)}
      >
        Búsqueda Avanzada
      </div>
      <form
        className={[
          'flex flex-col gap-8 transition-all sticky top-0',
          isVisible ? 'h-auto block' : 'h-0 hidden lg:block lg:h-auto',
        ].join(' ')}
        onSubmit={handleSubmit((values) => {
          setFilters(values);
        })}
        onChange={() => setFilters(getValues())}
      >
        <h2 className="text-primary text-xl">Búsqueda Avanzada</h2>
        <div className="flex flex-col gap-4 py-4">
          <select
            className="dark"
            {...register('subarea')}
            placeholder="Categoría"
          >
            <option value="">{t('Categoría')}</option>
            {Object.keys(areas).map((area, i) => (
              <optgroup key={area} label={area}>
                {Object.keys(areas[area]).map((subarea, n) => (
                  <option
                    key={subarea}
                    value={[i + 1, (n + 1).toString().padStart(2, '0')].join(
                      ''
                    )}
                  >
                    {subarea}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          {!!filters.area && !!filters.subarea && (
            <select
              {...register('activity')}
              placeholder="Actividad"
              className="dark"
            >
              {!!areas[getArea(filters.area)][
                getSubAreaFromId(filters.subarea)
              ] &&
                Object.keys(
                  areas[getArea(filters.area)][
                    getSubAreaFromId(filters.subarea)
                  ]
                ).map((activity) =>
                  getTitle(activity, 'Alias Genérico') ? (
                    <option key={activity} value={activity}>
                      {getTitle(activity, 'Alias Genérico')}
                    </option>
                  ) : (
                    <></>
                  )
                )}
            </select>
          )}
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
            <option value="Persona Moral">Persona Moral</option>
          </select>
          {/* <div className="flex flex-col gap-4 w-full">
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
            {!!lang && !Object.keys(languages).includes(lang) && (
              <input
                type="text"
                onChange={(e) => setValue('language', e.currentTarget.value, { shouldTouch: true })}
                placeholder="Escribe aquí el nombre del idioma"
              />
            )}
          </div> */}
        </div>
        <div className="flex flex-col gap-2">
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
