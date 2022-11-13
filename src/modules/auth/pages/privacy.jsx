import { useTranslation } from 'react-i18next';
import { ProgressBar } from '@shared/components/progressBar';
import { ProfileBadge } from '@modules/profile/components/profileBadge';
import { PrivacyPolicy } from '../components/privacyPolicy';
import { NavLink } from 'react-router-dom';
import { useCurrentUser } from '@shared/hooks/useCurrentUser';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import { ErrorMessage } from '@shared/components/errorMessage';
import { Container } from '@shared/layout/container';

export const PrivacyStep = () => {
  const { t } = useTranslation('profile');
  const { user, loading, error } = useCurrentUser();

  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <ErrorMessage message={error.toString()} />
  ) : (
    <>
      <ProfileBadge user={user} />
      <Container>
        <div className="flex flex-col gap-8 justify-items-stretch mt-8">
          <div className="flex flex-col gap-4 w-full items-center content-center">
            <p>{t('yourUserInformationProgress')}:</p>
            <ProgressBar progress={30} />
          </div>
          <PrivacyPolicy />
          <div className="flex flex-row gap-6 self-center">
            <NavLink to="revisar">
              <div className="button">{t('reviewUser')}</div>
            </NavLink>
            <NavLink to="completar">
              <div className="button">{t('completeUser')}</div>
            </NavLink>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PrivacyStep;
