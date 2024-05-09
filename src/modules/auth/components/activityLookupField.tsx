import RefList from '@shared/constants/deductiveReferents.json';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TextSelectField } from '../../../shared/components/textSelect';

export function ActivityLookupField({
  setValue,
}: {
  setValue: (value: string) => void;
}) {
  const { t } = useTranslation('auth');

  const OnlyMapsToOneId = useMemo(
    () =>
      RefList &&
      Object.entries(RefList)
        .map(([name, id], i) => ({
          id: 'activityMap' + i,
          name,
          activity: id,
        }))
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
