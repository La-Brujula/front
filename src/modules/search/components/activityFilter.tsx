import { useMemo } from 'react';

import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Input from '@/shared/components/input';
import areas from '@/shared/constants/areas';
import useLocalization from '@/shared/hooks/useLocalization';
import { getSubAreaObjectFromId, getTitle } from '@/shared/utils/areaUtils';

import { Search } from '../types/searchParams';

function ActivityFilter(props: {
  form: UseFormReturn<Search>;
  filters: Search;
}) {
  const { t } = useTranslation(['search', 'activityMatrix']);
  const { locale } = useLocalization();

  const areasOptions = useMemo(
    () =>
      areas.map((area) => ({
        value: area.id,
        label: t(area.name, { ns: 'activityMatrix' }),
      })),
    [areas]
  );
  const categories = useMemo(
    () =>
      props.filters.area !== undefined && props.filters.area.length > 0
        ? areas
            .find((area) => area.id == props.filters.area)
            ?.subareas.map((subarea) => ({
              value: subarea.id,
              label: t(subarea.name, { ns: 'activityMatrix' }),
            }))
        : undefined,
    [areas]
  );

  const activities = useMemo(
    () =>
      props.filters.category !== undefined && props.filters.category.length > 0
        ? Object.keys(getSubAreaObjectFromId(props.filters.category))
            .filter((activity) => getTitle(activity, 'other'))
            .map((activity) => ({
              value: activity,
              label: getTitle(activity, 'other', locale),
            }))
        : undefined,
    [props.filters.category, areas]
  );

  return (
    <>
      <Input
        label={t('Área')}
        form={props.form}
        fieldName="area"
        type="select"
        items={areasOptions}
      />
      {categories !== undefined && (
        <Input
          label={t('Categoría')}
          form={props.form}
          fieldName="category"
          type="select"
          items={categories}
        />
      )}
      {activities !== undefined && (
        <Input
          label={t('Actividad')}
          form={props.form}
          fieldName="activity"
          type="select"
          items={activities}
        />
      )}
    </>
  );
}

export default ActivityFilter;
