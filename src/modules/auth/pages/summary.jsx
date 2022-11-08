import { useTranslation } from 'react-i18next';
import { ProgressBar } from '@shared/components/progressBar';

export const ProfileSummary = () => {
  const { t } = useTranslation('auth');

  return (
    <>
      <p>{t('profileComplition')}</p>
      <ProgressBar progress={30} />
    </>
  );
};
