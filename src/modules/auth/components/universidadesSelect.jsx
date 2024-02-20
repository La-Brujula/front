import universidades from '@shared/constants/universidades.json';

export const UniversidadesSelect = ({
  register,
  fieldName,
  options,
  placeholder,
}) => {
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
};
