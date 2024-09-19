import countries from '@/shared/constants/countryFlags.json';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function CountryFlag(props: {
  country: keyof typeof countries;
}) {
  const { t } = useTranslation('countries');
  return (
    <Tooltip title={t(props.country)}>
      <span aria-label={t(props.country)}>{countries[props.country]}</span>
    </Tooltip>
  );
}
