import areas from '@/shared/constants/areas';

import { UseFormRegister } from 'react-hook-form';
import { Search } from '../types/searchParams';
import { useTranslation } from 'react-i18next';
import Input from '@/shared/components/input';
import { getSubAreaObjectFromId, getTitle } from '@/shared/utils/areaUtils';
import { useMemo, useState } from 'react';

function ActivityFilter(props: {
  register: UseFormRegister<Search>;
  filters: Search;
}) {
  const { t } = useTranslation('search');

  const categories = useMemo(
    () =>
      Object.fromEntries(
        areas.map((area, i) => [
          area.name,
          area.subareas.map((subarea, n) => ({
            key: subarea.id,
            label: subarea.name,
          })),
        ])
      ),
    [areas]
  );

  const activities = useMemo(
    () =>
      props.filters.category !== undefined
        ? Object.keys(getSubAreaObjectFromId(props.filters.category))
            .filter((activity) => getTitle(activity, 'other'))
            .map((activity) => ({
              key: activity,
              label: getTitle(activity, 'other'),
            }))
        : undefined,
    [props.filters.category, areas]
  );

  return (
    <>
      <Input
        label={t('Categoría')}
        register={props.register}
        fieldName="category"
        type="groupedSelect"
        groupedItems={categories}
      />
      {activities !== undefined && (
        <Input
          label={t('Actividad')}
          register={props.register}
          fieldName="activity"
          type="select"
          items={activities}
        />
      )}
    </>
  );
}

export default ActivityFilter;
