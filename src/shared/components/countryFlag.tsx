import countries from '@/shared/constants/countryFlags.json';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import 'flag-icons/css/flag-icons.min.css';

export default function CountryFlag(props: {
  country: keyof typeof countries;
  className?: string;
}) {
  const { t } = useTranslation('countries');
  return (
    <Tooltip title={t(props.country)}>
      <span
        className={`fi fi-${props.country.toLowerCase()} !size-8`}
        aria-label={t(props.country)}
      ></span>
    </Tooltip>
  );
}
