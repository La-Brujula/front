import { useMemo, useState } from 'react';

import { DeleteIcon } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import Input from '@/shared/components/input';
import genders from '@/shared/constants/genders';

import estados from '@shared/constants/estados.json';

import { Search } from '../types/searchParams';
import ActivityFilter from './activityFilter';
import { ExtraFilters } from './extraFilters';

const LOCATION_SELECT_ITEMS = (country: 'MX' | 'CO') =>
  estados[country].flatMap((estado) => ({
    value: estado,
    label: estado,
  }));

export const ResultsFilter = (props: {
  filters: Search;
  form: UseFormReturn<Search>;
  reset: () => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [moreFiltersVisible, setMoreFiltersVisible] = useState(false);
  const { t } = useTranslation(['search', 'genders']);

  const locationOptions = useMemo(
    () => LOCATION_SELECT_ITEMS(props.filters.country as 'MX' | 'CO'),
    [props.filters.country]
  );

  return (
    <>
      <Button
        className="rounded-md bg-primary px-4 py-2 text-white lg:hidden"
        onClick={() => setIsVisible(!isVisible)}
      >
        {t('Filtros')}
      </Button>
      <Form {...props.form}>
        <form
          className={[
            'top-0 flex flex-col bg-black bg-opacity-20 transition-all',
            '-mt-2 rounded-md p-4 lg:mt-0 lg:rounded-t-md',
            isVisible ? 'block h-auto' : 'hidden h-0 lg:block lg:h-auto',
          ].join(' ')}
        >
          <h2 className="hidden text-xl text-primary lg:block">
            {t('Filtros')}
          </h2>
          <div className="flex flex-col items-stretch gap-4 text-start">
            <div className="flex w-full flex-row-reverse">
              <Button
                className="ml-auto w-fit cursor-pointer text-white"
                onClick={props.reset}
              >
                <DeleteIcon />
              </Button>
            </div>
            <Input
              type="text"
              fieldName="name"
              form={props.form}
              label={t('Nombre')}
            />
            <ActivityFilter
              form={props.form}
              filters={props.filters}
            />
            <Input
              type="select"
              fieldName="location"
              form={props.form}
              label={t('Ubicación')}
              items={locationOptions}
            />
            <Input
              type="select"
              fieldName="gender"
              form={props.form}
              label={t('Género')}
              items={genders.slice(0, 3).map((gender) => ({
                value: gender,
                label: t(gender, { ns: 'genders' }),
              }))}
            />
            {moreFiltersVisible && (
              <ExtraFilters
                filters={props.filters}
                form={props.form}
              />
            )}
            <div
              className="cursor-pointer rounded-md bg-primary px-4 py-2 text-white"
              onClick={() => setMoreFiltersVisible(!moreFiltersVisible)}
            >
              {moreFiltersVisible ? t('Ver menos') : t('Ver más')}
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
