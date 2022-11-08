import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation('navigation');
  return (
    <div className="w-full text-center flex flex-col justify-center gap-4 py-4 px-2">
      {t('')}
      <div className="flex flex-row gap-8 mx-auto">
        <a href="BRUJULA_FACEBOOK">
          <img
            src={import.meta.env.BASE_URL + 'img/FBIcon.svg'}
            alt="Facebook"
            className="h-10"
          />
        </a>
        <a href="BRUJULA_INSTAGRAM">
          <img
            src={import.meta.env.BASE_URL + 'img/IGIcon.svg'}
            alt="Instagram"
            className="h-10"
          />
        </a>
        <a href="BRUJULA_WHATSAPP">
          <img
            src={import.meta.env.BASE_URL + 'img/WAIcon.svg'}
            alt="WhatsApp"
            className="h-10"
          />
        </a>
      </div>
      <div className="">
        <a href={import.meta.env.BASE_URL + "contacto"} className="text-primary">
          {t('contactUs')}
        </a>
        <p>
          {t('seeOur')}&nbsp;
          <a href={import.meta.env.BASE_URL + "contacto"} className="text-primary">
            {'privacy'}
          </a>
          &nbsp;y&nbsp;
          <a href={import.meta.env.BASE_URL + "contacto"} className="text-primary">
            {'legal'}
          </a>
        </p>
        <p>{t('trademark')}</p>
      </div>
    </div>
  );
};
