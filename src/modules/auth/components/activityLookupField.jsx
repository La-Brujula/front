import { useTranslation } from 'react-i18next';
import RefList from '@shared/constants/RefToCode.json';
import { useMemo } from 'react';
import { TextSelectField } from '../../../shared/components/textSelect';

export function ActivityLookupField({ setValue }) {
  const { t } = useTranslation('auth');

  const OnlyMapsToOneId = useMemo(
    () =>
      RefList &&
      Object.entries(RefList)
        .map(([name, ids], i) => {
          if (ids.length == 1 && ids[0].length == 6) {
            return { id: 'activityMap' + i, name, activity: ids[0] };
          }
        })
        .filter((a) => !!a),
    [RefList]
  );

  return (
    <div className="w-full">
      <TextSelectField
        placeholder={t('Buscar tu actividad')}
        items={OnlyMapsToOneId}
        setValue={setValue}
        onSelect={(item) => {
          setValue(item.activity);
        }}
      />
    </div>
  );
}
