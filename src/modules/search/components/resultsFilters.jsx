import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import areas from '@shared/constants/areas';
import regiones from '@shared/constants/regiones';
import genders from '@shared/constants/genders';
import { useEffect, useMemo, useState } from 'react';
import {
  getArea,
  getSubAreaFromId,
  getTitle,
} from '../../../shared/utils/areaUtils';
import { IconButton } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import { ExtraFilters } from './extraFilters';

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
  const [moreFiltersVisible, setMoreFiltersVisible] = useState(false);
  const { t } = useTranslation('search');

  return (
    <div className="">
      <div
        className="lg:hidden px-4 py-2 rounded-md bg-primary text-white
        cursor-pointer"
        onClick={() => setIsVisible(!isVisible)}
      >
        {t('filters')}
      </div>
      <form
        className={[
          'flex flex-col transition-all lg:sticky top-0 bg-black bg-opacity-20',
          'p-4 rounded-b-md -mt-2 lg:rounded-t-md lg:mt-0',
          isVisible
            ? 'h-auto block'
            : 'h-0 hidden lg:block lg:h-auto',
        ].join(' ')}
        onSubmit={handleSubmit((values) => {
          setFilters(values);
        })}
        onChange={() => setFilters(getValues())}
      >
        <h2 className="text-primary text-xl hidden lg:block">{t('filters')}</h2>
        <div className="flex flex-col gap-4 items-stretch">
          <div className="w-full flex flex-row-reverse">
            <IconButton
              className="text-primary cursor-pointer w-fit ml-auto"
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
              <DeleteOutlined className="text-primary" />
            </IconButton>
          </div>
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
          <select className="dark" {...register('gender')} placeholder="Género">
            <option value="">{t('Género')}</option>
            {genders.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
            <option value="Persona Moral">Persona Moral</option>
          </select>
          {moreFiltersVisible && (
            <ExtraFilters
              setFilters={setFilters}
              getValues={getValues}
              register={register}
              watch={watch}
            />
          )}
          <div
            className="px-4 py-2 rounded-md bg-primary text-white
        cursor-pointer"
            onClick={() => setMoreFiltersVisible(!moreFiltersVisible)}
          >
            {t('moreFilters')}
          </div>
        </div>
      </form>
    </div>
  );
};
