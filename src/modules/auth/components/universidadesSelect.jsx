import universidades from '@shared/constants/universidades.json';

export const UniversidadesSelect = ({ register, fieldname, options }) => {
  return (
    <select {...register(fieldname, options)}>
      <option value="" >Seleccione una opción</option>
      {universidades.map((uni) => (
        <option value={uni} key={uni}>{uni}</option>
      ))}
    </select>
  );
};
