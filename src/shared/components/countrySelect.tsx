import { DetailedHTMLProps, SelectHTMLAttributes, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import countries from '@shared/constants/countryCodes.json';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

function CountrySelect<T extends FieldValues>(props: {
  register: UseFormRegister<T>;
  fieldName: Path<T>;
}) {
  const { t } = useTranslation('countries');
  const translatedCountries = useMemo(
    () => countries.map((country) => ({ id: country, name: t(country) })),
    [countries, t]
  );
  return (
    <select {...props.register(props.fieldName)}>
      {translatedCountries.map((country) => (
        <option
          key={country.id}
          value={country.id}
        >
          {country.name}
        </option>
      ))}
    </select>
  );
}

export default CountrySelect;
