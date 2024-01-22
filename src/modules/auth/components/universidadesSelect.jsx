import universidades from '@shared/constants/universidades.json';

export const UniversidadesSelect = ({
  register,
  fieldname,
  options,
  placeholder,
}) => {
  return (
    <select {...register(fieldname, options)}>
      <option value="">{placeholder || 'Seleccione una opción'}</option>
      {universidades.map((uni) => (
        <option value={uni} key={uni}>
          {uni}
        </option>
      ))}
    </select>
  );
};
