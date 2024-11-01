import areas from '@/shared/constants/areas';

import { UseFormRegister } from 'react-hook-form';
import { Search } from '../types/searchParams';
import { useTranslation } from 'react-i18next';
import Input from '@/shared/components/input';
import { getSubAreaObjectFromId, getTitle } from '@/shared/utils/areaUtils';
import { useMemo } from 'react';
import useLocalization from '@/shared/hooks/useLocalization';

function ActivityFilter(props: {
  register: UseFormRegister<Search>;
  filters: Search;
}) {
  const { t } = useTranslation(['search', 'activityMatrix']);
  const { locale } = useLocalization();

  const areasOptions = useMemo(
    () =>
      areas.map((area) => ({
        key: area.id,
        label: t(area.name, { ns: 'activityMatrix' }),
        className: 'font-bold text-xs',
      })),
    [areas]
  );
  const categories = useMemo(
    () =>
      props.filters.area !== undefined && props.filters.area.length > 0
        ? areas
            .find((area) => area.id == props.filters.area)
            ?.subareas.map((subarea) => ({
              key: subarea.id,
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
              key: activity,
              label: getTitle(activity, 'other', locale),
            }))
        : undefined,
    [props.filters.category, areas]
  );

  return (
    <>
      <Input
        label={t('Área')}
        register={props.register}
        fieldName="area"
        type="select"
        items={areasOptions}
        value={props.filters.area}
      />
      {categories !== undefined && (
        <Input
          label={t('Categoría')}
          register={props.register}
          fieldName="category"
          type="select"
          items={categories}
          value={props.filters.category}
        />
      )}
      {activities !== undefined && (
        <Input
          label={t('Actividad')}
          register={props.register}
          fieldName="activity"
          type="select"
          items={activities}
          value={props.filters.activity}
        />
      )}
    </>
  );
}

export default ActivityFilter;
