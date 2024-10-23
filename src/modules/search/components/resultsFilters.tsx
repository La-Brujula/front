import genders from '@shared/constants/genders.json';
import regiones from '@shared/constants/regiones.json';
import { useState } from 'react';
import { ExtraFilters } from './extraFilters';
import { Search } from '../types/searchParams';
import Input from '@/shared/components/input';
import { IconButton } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { UseFormRegister } from 'react-hook-form';
import ActivityFilter from './activityFilter';

const LOCATION_SELECT_ITEMS = [
  {
    key: 'MX',
    label: 'MX',
    className: '!font-bold text-2xl !uppercase',
  },
  ...regiones?.flatMap((region) => {
    const estados = region.estados?.map((estado) => ({
      key: estado,
      label: estado,
      className: '!pl-6',
    }));
    return [
      {
        key: region.nombre,
        label: region.nombre,
        className: '!font-bold !uppercase',
      },
      ...estados,
    ];
  }),
];

export const ResultsFilter = (props: {
  filters: Search;
  register: UseFormRegister<Search>;
  reset: () => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [moreFiltersVisible, setMoreFiltersVisible] = useState(false);
  const { t } = useTranslation(['search', 'genders']);

  return (
    <div className="">
      <button
        className="lg:hidden px-4 py-2 rounded-md bg-primary text-white"
        onClick={() => setIsVisible(!isVisible)}
      >
        {t('Filtros')}
      </button>
      <form
        className={[
          'flex flex-col transition-all top-0 bg-black bg-opacity-20',
          'p-4 rounded-b-md -mt-2 lg:rounded-t-md lg:mt-0',
          isVisible ? 'h-auto block' : 'h-0 hidden lg:block lg:h-auto',
        ].join(' ')}
      >
        <h2 className="text-primary text-xl hidden lg:block">{t('Filtros')}</h2>
        <div className="flex flex-col gap-4 items-stretch text-start">
          <div className="w-full flex flex-row-reverse">
            <IconButton
              className="text-white cursor-pointer w-fit ml-auto"
              onClick={props.reset}
            >
              <DeleteOutlined />
            </IconButton>
          </div>
          <ActivityFilter
            register={props.register}
            filters={props.filters}
          />
          <Input
            label={t('Ubicación')}
            register={props.register}
            fieldName="location"
            type="select"
            items={LOCATION_SELECT_ITEMS}
          />
          <Input
            label={t('Género')}
            register={props.register}
            fieldName="gender"
            type="select"
            items={genders.slice(0, 3).map((gender) => ({
              key: gender,
              label: t(gender, { ns: 'genders' }),
            }))}
          />
          {moreFiltersVisible && (
            <ExtraFilters
              filters={props.filters}
              register={props.register}
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
