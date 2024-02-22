import { SearchFilters } from '@/shared/hooks/useSearch';
import universidades from '@shared/constants/universidades.json';
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

export function UniversidadesSelect<T extends FieldValues>({
  register,
  fieldName,
  options,
  placeholder,
}: {
  register: UseFormRegister<T>;
  fieldName: Path<T>;
  options?: RegisterOptions;
  placeholder?: string;
}) {
  return (
    <select {...register(fieldName, options)}>
      <option value="">{placeholder || 'Seleccione una opción'}</option>
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
