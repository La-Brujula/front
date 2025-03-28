import StatsBar from '@/modules/jobs/components/statsBar';
import DataSuspense from '@/shared/components/dataSuspense';
import { useCurrentProfile } from '@/shared/hooks/useCurrentProfile';
import { useLoggedInAccount } from '@/shared/hooks/useLoggedInAccount';
import { Container } from '@/shared/layout/container';
import { createLazyFileRoute, Link, Outlet } from '@tanstack/react-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/jobs')({
  component: JobsLayout,
});

export default function JobsLayout() {
  const { t } = useTranslation('jobs');

  const loggedInAccount = useLoggedInAccount();

  const { data: profile, isLoading, error } = useCurrentProfile();

  const isVerified = useMemo(() => !!profile?.verified, [profile, isLoading]);
  return (
    <>
      {loggedInAccount ? (
        <div className="grid grid-cols-2 justify-between items-center gap-4 px-8 py-2">
          <DataSuspense
            loading={isLoading}
            error={error}
          >
            {isVerified ? (
              <Link
                to="/jobs/create"
                className="px-8 py-4 rounded-md bg-primary text-white text-base font-bold text-center"
              >
                {t('Crea una nueva oferta laboral')}
              </Link>
            ) : (
              <Link
                to="/auth/send-verification"
                className="px-8 py-4 rounded-md bg-secondary text-white text-base font-bold text-center"
              >
                {t('Verifica tu cuenta para crear una oferta')}
              </Link>
            )}
          </DataSuspense>
          {loggedInAccount !== null && <StatsBar />}
        </div>
      ) : (
        <></>
      )}
      <Outlet />
    </>
  );
}
