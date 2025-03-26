import AccountUpdateForm from '@/modules/me/components/accountUpdateForm';
import { useCurrentAccount } from '@/modules/me/hooks/getAccountHook';
import DataSuspense from '@/shared/components/dataSuspense';
import { useCurrentProfile } from '@/shared/hooks/useCurrentProfile';
import { Container } from '@/shared/layout/container';
import { ProfileBadge } from '@modules/profile/components/profileBadge';
import ErrorMessage from '@shared/components/errorMessage';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/alerts')({
  component: AlertsPage,
});

function AlertsPage() {
  const { t } = useTranslation('auth');

  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useCurrentProfile();

  const {
    data: account,
    isLoading: accountLoading,
    error: accountError,
  } = useCurrentAccount();

  return (
    <Container>
      <div className="max-w-3xl mx-auto">
        <DataSuspense
          loading={profileLoading}
          error={profileError}
          errorComponent={
            <ErrorMessage
              message={profileError?.message || t('Could not find profile')}
            />
          }
        >
          <ProfileBadge user={profile} />
        </DataSuspense>
        <div className="mb-8"></div>

        <DataSuspense
          loading={accountLoading}
          error={accountError}
          errorComponent={
            <ErrorMessage
              message={accountError?.message || t('Could not find user')}
            />
          }
        >
          <AccountUpdateForm account={account} />
        </DataSuspense>
      </div>
    </Container>
  );
}

export default AlertsPage;
