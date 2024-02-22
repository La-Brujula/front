import { useTranslation } from 'react-i18next';

export const PrivacyPolicy = () => {
  const { t } = useTranslation('profile');

  return (
    <p>
      {t('Al continuar, aceptas nuestro ')}
      <a
        href={import.meta.env.BASE_URL + 'pdf/privacy.pdf'}
        className="text-primary"
        target="_blank"
      >
        {t('aviso legal y de privacidad')}
      </a>
    </p>
  );
};
