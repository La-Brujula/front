import { useCallback, useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { UserCard } from '@/modules/search/components/userCard';
import DataSuspense from '@/shared/components/dataSuspense';
import { useLoggedInAccount } from '@/shared/hooks/useLoggedInAccount';

import { jobApplicantsOptions, useApplyToJob } from '../queries/jobSearchQuery';

export default function Applicants(props: {
  jobId: string;
  ownOpening: boolean;
}) {
  const { t } = useTranslation('jobs');

  const loggedInAccount = useLoggedInAccount();
  const queryOptions = useMemo(
    () => jobApplicantsOptions(props.jobId),
    [props.jobId]
  );

  const {
    data: applicants,
    isLoading: loading,
    error,
  } = useQuery(queryOptions);

  const { mutate, isPending, error: applyError } = useApplyToJob(props.jobId);

  const alreadyApplied = useMemo(() => {
    if (loading || loggedInAccount === null || applicants === undefined)
      return true;
    if (applicants.length === 0) return false;
    return (
      applicants.find(
        (applicant) => applicant.id === loggedInAccount.ProfileId
      ) !== undefined
    );
  }, [loggedInAccount, applicants]);

  const applyToJob = useCallback(() => {
    if (alreadyApplied) return false;
    mutate();
  }, [alreadyApplied, mutate]);

  return (
    <DataSuspense
      loading={loading}
      error={error}
      key={props.jobId}
    >
      <div className="flex flex-col items-center justify-center gap-2 py-8">
        <h2 className="font-normal text-primary">{t('Aplicantes')}</h2>
        {!alreadyApplied && !props.ownOpening && !!loggedInAccount && (
          <DataSuspense
            loading={isPending}
            error={applyError}
          >
            <Button
              className="w-fit cursor-pointer justify-self-center rounded-md bg-primary px-4 py-2 text-lg font-bold text-white disabled:bg-slate-400"
              onClick={applyToJob}
              disabled={isPending || loading}
            >
              {t('Aplicar')}
            </Button>
          </DataSuspense>
        )}
        <div className="flex flex-col gap-2 text-left [&>*]:border-b [&>*]:border-b-black [&>*]:border-opacity-20 [&>*]:pb-4">
          {applicants && applicants.length > 0 ? (
            applicants?.map((a) => (
              <UserCard
                user={a}
                key={a.id}
              />
            ))
          ) : (
            <p className="text-lg">
              {t('Nadie ha aplicado a esta oferta aún')}
            </p>
          )}
        </div>
      </div>
    </DataSuspense>
  );
}
