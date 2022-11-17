import { useTranslation } from 'react-i18next';
import { ProgressBar } from '@shared/components/progressBar';
import { ProfileHeader } from '../components/profileHeader';
import { useUserInfo } from '@shared/hooks/useUserInfo';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import { ErrorMessage } from '@shared/components/errorMessage';
import { Container } from '@shared/layout/container';
import { useAuth } from '@shared/context/firebaseContext';
import { brujulaUtils } from '@shared/utils/brujulaUtils';


export const LandingPage = () => {
  const { t } = useTranslation('profile');
  const { getUserEmail } = useAuth();
  const brujula = brujulaUtils()
  const { user, loading, error } = useUserInfo(brujula.getCurrentUserEmail(getUserEmail));

  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <ErrorMessage message={error.toString()} />
  ) : (
    <>
      <ProfileHeader user={user} />
      <Container>
        <div className="flex flex-col gap-8 justify-items-stretch mt-8">
          <div className="flex flex-col gap-4 w-full items-center content-center">
            <p>{t('yourUserInformationProgress')}:</p>
            <ProgressBar progress={30} />
          </div>
        </div>
      </Container>
    </>
  );
};
