import { useTranslation } from 'react-i18next';
import { useUserInfo } from '@shared/hooks/useUserInfo';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import { ErrorMessage } from '@shared/components/errorMessage';
import { ProfileBadge } from '@modules/profile/components/profileBadge';

export const LoginOrProfile = () => {
  const { t } = useTranslation('landing');
  const { user, error, loading } = useUserInfo();
  return (
    <div className="bg-primary bg-opacity-20 py-8 px-8 grow text-center w-full">
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error.toString()} />
      ) : !user ? (
        <>
          <h2 className="mb-4">{t('login')}</h2>
          <LoginForm color="lightblue" />
        </>
      ) : (
        <>
          <h2 className="mb-4">{t('bienvenidx')}</h2>
          <ProfileBadge user={user} />
        </>
      )}
    </div>
  );
};
