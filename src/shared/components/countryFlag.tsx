import 'flag-icons/css/flag-icons.min.css';
import { useTranslation } from 'react-i18next';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import countries from '@/shared/constants/countryCodes';

export default function CountryFlag(props: {
  country: (typeof countries)[number];
  className?: string;
  noTooltip?: boolean;
}) {
  const { t } = useTranslation('countries');
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <span
            className={`fi fis overflow-hidden rounded-full fi-${props.country.toLowerCase()} size-8 ${props.className}`}
            aria-label={t(props.country)}
          ></span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{props.noTooltip ? undefined : t(props.country)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
