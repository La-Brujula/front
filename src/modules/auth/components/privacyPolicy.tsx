import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const PrivacyPolicy = () => {
  const { t } = useTranslation('profile');

  return (
    <p>
      {t('Al continuar, aceptas nuestro ')}
      <Link
        to="/privacy"
        className="text-primary"
        target="_blank"
      >
        {t('aviso legal y de privacidad')}
      </Link>
    </p>
  );
};
