import RefList from '@shared/constants/inductiveReferents.json';
import { useTranslation } from 'react-i18next';
import { TextSelectField } from '../../../shared/components/textSelect';

export const ReferenceField = ({
  defaultValue,
  setValue,
}: {
  defaultValue?: string;
  setValue: (value: string) => void;
}) => {
  const { t } = useTranslation('search');

  return (
    <TextSelectField
      placeholder={t('Ingresa una palabra clave')}
      items={Object.entries(RefList).map(([ref, ids]) => {
        return { id: ids, name: ref };
      })}
      defaultValue={defaultValue}
      setValue={setValue}
    />
  );
};
