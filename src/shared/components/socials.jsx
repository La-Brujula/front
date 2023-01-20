import { useTranslation } from 'react-i18next';
import contactInformation from '../constants/brujulaInformation.json';

export function SocialLinks() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-8 mx-auto">
        <a href={contactInformation.facebook}>
          <img
            src={import.meta.env.BASE_URL + 'img/FBIcon.svg'}
            alt="Facebook"
            className="h-10"
          />
        </a>
        <a href={contactInformation.instagram}>
          <img
            src={import.meta.env.BASE_URL + 'img/IGIcon.svg'}
            alt="Instagram"
            className="h-10"
          />
        </a>
        <a href={contactInformation.youtube}>
          <img
            src={import.meta.env.BASE_URL + 'img/YoutubeIcon.svg'}
            alt="Youtube"
            className="h-10"
          />
        </a>
        <a href={contactInformation.whatsapp}>
          <img
            src={import.meta.env.BASE_URL + 'img/WAIcon.svg'}
            alt="WhatsApp"
            className="h-10"
          />
        </a>
      </div>
      <p className="font-bold text-primary">
        {t('¡Siguenos en nuestras redes sociales!')}
      </p>
    </div>
  );
}
