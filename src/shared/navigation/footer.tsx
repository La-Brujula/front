import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { SocialLinks } from '../components/socials';

export const Footer = () => {
  const { t } = useTranslation('navigation');
  return (
    <div className="flex w-full flex-col justify-center gap-4 bg-primary-foreground px-6 py-8 text-center">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-6 md:grid-cols-[1fr,_3fr,_1fr] md:gap-0">
        <Link
          to="/contact"
          className="font-bold text-primary md:order-first"
        >
          {t('contactUs')}
        </Link>
        <SocialLinks />
        <p>
          {t('seeOur')}&nbsp;
          <Link
            to="/privacy"
            className="text-primary"
            target="_blank"
          >
            {t('privacy')}
          </Link>
        </p>
      </div>
      <p>{t('trademark')}</p>
    </div>
  );
};
