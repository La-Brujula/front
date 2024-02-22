import {
  DeleteOutlined,
  ExpandLessOutlined,
  ExpandMoreOutlined,
} from '@mui/icons-material';
import areas from '@shared/constants/areas.json';
import genders from '@shared/constants/genders.json';
import regiones from '@shared/constants/regiones.json';
import { ChangeEvent, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getSubAreaObjectFromId, getTitle } from '@shared/utils/areaUtils';
import { ExtraFilters } from './extraFilters';
import { IconButton } from '@mui/material';
import { SearchFilters } from '@/shared/hooks/useSearch';

export const ResultsFilter = ({
  setFilters,
  filters,
}: {
  setFilters: (v: SearchFilters) => void;
  filters: SearchFilters;
}) => {
  const formSubarea = filters.subarea;

  const [isVisible, setIsVisible] = useState(false);
  const [moreFiltersVisible, setMoreFiltersVisible] = useState(false);
  const { t } = useTranslation('search');

  const clearFilters = useCallback(() => {
    const emptyFilters = {} as SearchFilters;
    Object.keys(filters).forEach((key) => {
      emptyFilters[key as keyof SearchFilters] = undefined;
    });
    setFilters(emptyFilters);
  }, []);

  const updateFilterValue = useCallback(
    (fieldName: keyof SearchFilters) =>
      (ev: ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>
        setFilters({ [fieldName]: ev.currentTarget.value }),
    [setFilters],
  );

  return (
    <div className="">
      <div
        className="lg:hidden px-4 py-2 rounded-md bg-primary text-white
        cursor-pointer"
        onClick={() => setIsVisible(!isVisible)}
      >
        {t('filters')}
        {isVisible ? <ExpandMoreOutlined /> : <ExpandLessOutlined />}
      </div>
      <form
        className={[
          'flex flex-col transition-all lg:sticky top-0 bg-black bg-opacity-20',
          'p-4 rounded-b-md -mt-2 lg:rounded-t-md lg:mt-0',
          isVisible ? 'h-auto block' : 'h-0 hidden lg:block lg:h-auto',
        ].join(' ')}
      >
        <h2 className="text-primary text-xl hidden lg:block">{t('filters')}</h2>
        <div className="flex flex-col gap-4 items-stretch">
          <div className="w-full flex flex-row-reverse">
            <IconButton
              className="text-white cursor-pointer w-fit ml-auto"
              onClick={clearFilters}
            >
              <DeleteOutlined />
            </IconButton>
          </div>
          <select
            className="dark"
            onChange={updateFilterValue('subarea')}
            defaultValue={filters.subarea}
          >
            <option value="">{t('Categoría')}</option>
            {Object.entries(areas).map(([area, subareas], i) => (
              <optgroup
                key={area}
                label={area}
              >
                {Object.keys(subareas).map((subarea, n) => (
                  <option
                    key={subarea}
                    value={[i + 1, (n + 1).toString().padStart(2, '0')].join(
                      '',
                    )}
                  >
                    {subarea}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          {!!formSubarea && (
            <select
              onChange={updateFilterValue('activity')}
              className="dark"
              defaultValue={filters.activity}
            >
              <option value="">{t('Actividad')}</option>
              {Object.keys(getSubAreaObjectFromId(formSubarea)).map(
                (activity) =>
                  getTitle(activity, 'No Binario') ? (
                    <option
                      key={activity}
                      value={activity}
                    >
                      {getTitle(activity, 'No Binario')}
                    </option>
                  ) : (
                    <></>
                  ),
              )}
            </select>
          )}
          <select
            className="dark"
            onChange={updateFilterValue('state')}
            defaultValue={filters.state}
          >
            <option value="">{t('Ubicación')}</option>
            {regiones?.map((region) => (
              <optgroup
                key={region.id}
                label={region.nombre}
              >
                {region.estados?.map((estado) => (
                  <option
                    key={encodeURI(estado)}
                    value={estado}
                  >
                    {estado}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <select
            className="dark"
            onChange={updateFilterValue('gender')}
            defaultValue={filters.gender}
          >
            <option value="">{t('Género')}</option>
            {genders.slice(0, 3).map((e) => (
              <option
                key={e}
                value={e}
              >
                {e}
              </option>
            ))}
          </select>
          {moreFiltersVisible && (
            <ExtraFilters
              setFilters={setFilters}
              filters={filters}
              updateFilterValue={updateFilterValue}
            />
          )}
          <div
            className="px-4 py-2 rounded-md bg-primary text-white
        cursor-pointer"
            onClick={() => setMoreFiltersVisible(!moreFiltersVisible)}
          >
            {moreFiltersVisible ? t('Ver menos') : t('Ver más')}
          </div>
        </div>
      </form>
    </div>
  );
};
