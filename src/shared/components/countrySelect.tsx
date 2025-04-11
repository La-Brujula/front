import { useMemo } from 'react';

import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import countries from '@/shared/constants/countryCodes';

import Input from './input';

function CountrySelect<T extends FieldValues>(props: {
  form: UseFormReturn<T>;
  fieldName: Path<T>;
  filterFn?: (
    unfilteredCountries: typeof countries
  ) => (typeof countries)[number][];
  hasLabel?: boolean;
}) {
  const { t } = useTranslation('countries');

  const filteredCountries = useMemo(
    () => (props.filterFn ? props.filterFn(countries) : countries),
    [props.filterFn]
  );

  return (
    <Input
      type="select"
      fieldName={props.fieldName}
      form={props.form}
      label={t('País')}
      hiddenLabel={props.hasLabel !== true}
      items={filteredCountries.map((country) => ({
        value: country,
        label: t(country),
      }))}
    />
  );
}

export default CountrySelect;
