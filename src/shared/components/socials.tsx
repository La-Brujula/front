import { useTranslation } from 'react-i18next';

import contactInformation from '../constants/brujulaInformation.json';

export function SocialLinks() {
  const { t } = useTranslation();
  return (
    <div className="-order-10 flex flex-col gap-2 md:order-none lg:gap-4">
      <a
        target="_blank"
        href={contactInformation.whatsapp}
        className="mb-4 flex flex-row items-center gap-4 self-center rounded-full bg-primary px-4 py-2 text-white"
      >
        <img
          src={import.meta.env.BASE_URL + 'img/support.svg'}
          alt="Soporte"
          className="h-10"
        />
        <p className="text-2xl font-bold">Soporte</p>
      </a>
      <div className="order-last mx-auto flex flex-row gap-8 md:order-none">
        <a
          target="_blank"
          href={contactInformation.facebook}
        >
          <img
            src={import.meta.env.BASE_URL + 'img/FBIcon.svg'}
            alt="Facebook"
            className="h-10"
          />
        </a>
        <a
          target="_blank"
          href={contactInformation.instagram}
        >
          <img
            src={import.meta.env.BASE_URL + 'img/IGIcon.svg'}
            alt="Instagram"
            className="h-10"
          />
        </a>
        <a
          target="_blank"
          href={contactInformation.youtube}
        >
          <img
            src={import.meta.env.BASE_URL + 'img/YoutubeIcon.svg'}
            alt="Youtube"
            className="h-10"
          />
        </a>
        <a
          target="_blank"
          href={contactInformation.whatsapp}
        >
          <img
            src={import.meta.env.BASE_URL + 'img/WAIcon.svg'}
            alt="WhatsApp"
            className="h-10"
          />
        </a>
      </div>
      <p className="font-bold text-primary">
        {t('¡Síguenos en nuestras redes sociales!')}
      </p>
    </div>
  );
}
