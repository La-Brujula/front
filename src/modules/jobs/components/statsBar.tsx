import { useLoggedInAccount } from '@/shared/hooks/useLoggedInAccount';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCreatedJobs } from '../queries/jobSearchQuery';
import DataSuspense from '@/shared/components/dataSuspense';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';

export default function StatsBar() {
  const { t } = useTranslation('jobs');
  const loggedInAccount = useLoggedInAccount();

  const queryOptions = useMemo(getCreatedJobs, [loggedInAccount]);

  const { data: results, isLoading: loading, error } = useQuery(queryOptions);

  return (
    <Link to="/jobs/me">
      <div className="grid gap-2 p-4 justify-center justify-items-center">
        <DataSuspense
          loading={loading}
          error={error}
        >
          {results?.meta?.total || 0}
        </DataSuspense>
        <p>{t('empleos creados')}</p>
      </div>
    </Link>
  );
}
