import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import countries from '@/shared/constants/countryCodes';
import { FieldValues, Path, SetFieldValue } from 'react-hook-form';
import CountryFlag from './countryFlag';
import { ArrowDropDownOutlined } from '@mui/icons-material';

function CountrySelect<T extends FieldValues>(props: {
  setValue: SetFieldValue<T>;
  fieldName: Path<T>;
  value: (typeof countries)[number];
  filterFn?: (
    unfilteredCountries: typeof countries
  ) => (typeof countries)[number][];
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('countries');

  const handleCountryClick = useCallback(
    (value: (typeof countries)[number]) => () => {
      if (value != props.value) props.setValue(props.fieldName, value);
      setOpen(false);
    },
    [props.setValue, setOpen, props.fieldName, props.value]
  );

  const filteredCountries = useMemo(
    () => (props.filterFn ? props.filterFn(countries) : countries),
    [props.filterFn]
  );

  return (
    <div className="relative self-center w-fit isolate">
      <div
        className="cursor-pointer self-center flex flex-row w-fit gap-2 items-center flex-shrink z-0"
        onClick={() => setOpen((open) => !open)}
      >
        <CountryFlag
          country={props.value}
          className={props.className ?? 'block !size-16'}
          noTooltip={open}
        />
        <ArrowDropDownOutlined />
      </div>
      {open && (
        <div className="absolute top-full left-2 translate-y-2 transform bg-white rounded-md grid grid-cols-[max-content_1fr] divide-y divide-black divide-opacity-20 z-50">
          {filteredCountries.map((country) => (
            <div
              key={country}
              onClick={handleCountryClick(country)}
              className="bg-trasparent grid grid-cols-subgrid gap-3 col-span-full p-2 items-center cursor-pointer text-left"
            >
              <CountryFlag
                country={country}
                className="block !size-8"
                noTooltip
              />
              <span className="text-black font-normal">{t(country)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CountrySelect;
