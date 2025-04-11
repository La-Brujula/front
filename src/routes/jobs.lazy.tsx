import { useMemo } from 'react';

import { Link, Outlet, createLazyFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import StatsBar from '@/modules/jobs/components/statsBar';
import DataSuspense from '@/shared/components/dataSuspense';
import { useCurrentProfile } from '@/shared/hooks/useCurrentProfile';
import { useLoggedInAccount } from '@/shared/hooks/useLoggedInAccount';

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
        <div className="grid grid-cols-2 items-center justify-between gap-4 px-8 py-2">
          <DataSuspense
            loading={isLoading}
            error={error}
          >
            {isVerified ? (
              <Link
                to="/jobs/create"
                className="rounded-md bg-primary px-8 py-4 text-center text-base font-bold text-white"
              >
                {t('Crea una nueva oferta laboral')}
              </Link>
            ) : (
              <Link
                to="/auth/send-verification"
                className="rounded-md bg-secondary px-8 py-4 text-center text-base font-bold text-white"
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
