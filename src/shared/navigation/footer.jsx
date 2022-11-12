import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation('navigation');
  return (
    <div className="w-full text-center flex flex-col justify-center gap-4 py-8 px-6">
      <div className="grid grid-cols-1 md:grid-cols-[min-content_1fr_min-content]
      max-w-3xl mx-auto w-full">
        <a
          href={import.meta.env.BASE_URL + 'contacto'}
          className="text-primary font-bold"
        >
          {t('contactUs')}
        </a>
        <div className="flex flex-col gap-4">
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
            <a href="BRUJULA_YOUTUBE">
              <img
                src={import.meta.env.BASE_URL + 'img/YoutubeIcon.svg'}
                alt="Youtube"
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
          <p className="font-bold text-primary">{t('siguenosCTA')}</p>
        </div>
        <p>
          {t('seeOur')}&nbsp;
          <a
            href={import.meta.env.BASE_URL + 'contacto'}
            className="text-primary"
          >
            {'privacy'}
          </a>
          &nbsp;y&nbsp;
          <a
            href={import.meta.env.BASE_URL + 'contacto'}
            className="text-primary"
          >
            {'legal'}
          </a>
        </p>
      </div>
      <p>{t('trademark')}</p>
    </div>
  );
};
