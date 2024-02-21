import { useTranslation } from 'react-i18next';
import TOS from '@assets/pdf/privacy.pdf';

export const PrivacyPolicy = () => {
  const { t } = useTranslation('profile');

  return (
    <p>
      {t('Al continuar, aceptas nuestro ')}
      <a
        href={TOS}
        className="text-primary"
        target="_blank"
      >
        {t('aviso legal y de privacidad')}
      </a>
    </p>
  );
};
