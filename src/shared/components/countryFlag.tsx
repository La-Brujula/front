import countries from '@/shared/constants/countryCodes';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import 'flag-icons/css/flag-icons.min.css';

export default function CountryFlag(props: {
  country: (typeof countries)[number];
  className?: string;
  noTooltip?: boolean;
}) {
  const { t } = useTranslation('countries');
  return (
    <Tooltip title={props.noTooltip ? undefined : t(props.country)}>
      <span
        className={`fi fis rounded-full overflow-hidden fi-${props.country.toLowerCase()} size-8 ${props.className}`}
        aria-label={t(props.country)}
      ></span>
    </Tooltip>
  );
}
