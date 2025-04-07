import DataSuspense from '@/shared/components/dataSuspense';
import { useCurrentProfile } from '@/shared/hooks/useCurrentProfile';
import { Container } from '@/shared/layout/container';
import { ProfileBadge } from '@modules/profile/components/profileBadge';
import ErrorMessage from '@shared/components/errorMessage';
import { Outlet, createLazyFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/me')({
  component: BaseStepPage,
});

function BaseStepPage() {
  const { data: user, isLoading: loading, error } = useCurrentProfile();
  const { t } = useTranslation('auth');

  return (
    <Container>
      <div className="max-w-3xl mx-auto">
        <DataSuspense
          loading={loading}
          error={error}
          errorComponent={
            <ErrorMessage
              message={error?.message || t('Could not find user')}
            />
          }
        >
          <ProfileBadge user={user!} />
        </DataSuspense>
        <div className="mb-8"></div>
        <Outlet />
      </div>
    </Container>
  );
}

export default BaseStepPage;
