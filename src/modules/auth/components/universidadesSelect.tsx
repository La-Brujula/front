import { SearchFilters } from '@/shared/hooks/useSearch';
import universidades from '@shared/constants/universidades.json';
import { ChangeEventHandler } from 'react';
import {} from 'react-hook-form';

export function UniversidadesSelect({
  onChange,
  placeholder,
}: {
  onChange: ChangeEventHandler;
  placeholder?: string;
}) {
  return (
    <select onChange={onChange}>
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
