import { useTranslation } from 'react-i18next';
import { SocialLinks } from '../components/socials';
import { Link } from '@tanstack/react-router';

export const Footer = () => {
  const { t } = useTranslation('navigation');
  return (
    <div
      className="w-full text-center flex flex-col
    justify-center gap-4 py-8 px-6 bg-primary bg-opacity-20"
    >
      <div
        className="grid grid-cols-1 md:grid-cols-[1fr,_3fr,_1fr]
      max-w-6xl mx-auto w-full items-center gap-6 md:gap-0"
      >
        <Link
          to="/contact"
          className="text-primary font-bold md:order-first"
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
