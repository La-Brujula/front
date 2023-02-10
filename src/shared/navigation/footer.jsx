import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { SocialLinks } from '../components/socials';

export const Footer = () => {
  const { t } = useTranslation('navigation');
  return (
    <div className="w-full text-center flex flex-col justify-center gap-4 py-8 px-6">
      <div
        className="grid grid-cols-1 md:grid-cols-[1fr,_3fr,_1fr]
      max-w-6xl mx-auto w-full items-center"
      >
        <NavLink to="contacto" className="text-primary font-bold">
          {t('contactUs')}
        </NavLink>
        <SocialLinks />
        <p>
          {t('seeOur')}&nbsp;
          <NavLink to="/pdf/privacy.pdf" className="text-primary">
            {t('privacy')}
          </NavLink>
        </p>
      </div>
      <p>{t('trademark')}</p>
    </div>
  );
};
