import universidades from '@shared/constants/universidades.json';
import { ChangeEventHandler } from 'react';
import { useTranslation } from 'react-i18next';

export function UniversidadesSelect({
  onChange,
  placeholder,
}: {
  onChange: ChangeEventHandler;
  placeholder?: string;
}) {
  const { t } = useTranslation('auth');
  return (
    <select onChange={onChange}>
      <option value="">{placeholder || t('Seleccione una opción')}</option>
      {universidades.map((uni) => (
        <option
          value={uni}
          key={uni}
        >
          {uni}
        </option>
      ))}
    </select>
  );
}
