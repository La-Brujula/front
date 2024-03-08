import { DetailedHTMLProps, SelectHTMLAttributes, useMemo } from 'react';
import { TextSelectField } from './textSelect';
import { useTranslation } from 'react-i18next';
import countries from '@shared/constants/countryCodes.json';

function CountrySelect(
  props: DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >,
) {
  const { t } = useTranslation('countries');
  const translatedCountries = useMemo(
    () => countries.map((country) => ({ id: country, name: t(country) })),
    [countries, t],
  );
  return (
    <select {...props}>
      {translatedCountries.map((country) => (
        <option value={country.id}>{country.name}</option>
      ))}
    </select>
  );
}

export default CountrySelect;
