import universidades from '@shared/constants/universidades.json';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export function UniversidadesSelect<T extends FieldValues>(props: {
  register: UseFormRegister<T>;
  fieldName: Path<T>;
  placeholder?: string;
}) {
  const { t } = useTranslation('auth');
  return (
    <select {...props.register(props.fieldName)}>
      <option value="">
        {props.placeholder || t('Seleccione una opción')}
      </option>
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
