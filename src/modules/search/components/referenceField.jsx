import { useTranslation } from 'react-i18next';
import RefList from '@shared/constants/RefList.json';
import { TextSelectField } from '../../../shared/components/textSelect';

export const ReferenceField = ({ defaultValue, setValue }) => {
  const { t } = useTranslation('search');

  return (
    <TextSelectField
      placeholder={t('Ingresa una palabra clave')}
      items={RefList.map((ref) => {
        return { id: ref, name: ref };
      })}
      defaultValue={defaultValue}
      setValue={setValue}
    />
  );
};
