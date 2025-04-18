import DataSuspense from '@/shared/components/dataSuspense';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { jobApplicantsOptions, useApplyToJob } from '../queries/jobSearchQuery';
import { useTranslation } from 'react-i18next';
import { UserCard } from '@/modules/search/components/userCard';
import { useLoggedInAccount } from '@/shared/hooks/useLoggedInAccount';

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
      <div className="py-8 flex flex-col justify-center items-center gap-2">
        <h2 className="font-normal text-primary">{t('Aplicantes')}</h2>
        {!alreadyApplied && !props.ownOpening && !!loggedInAccount && (
          <DataSuspense
            loading={isPending}
            error={applyError}
          >
            <button
              className="justify-self-center cursor-pointer text-lg font-bold bg-primary px-4 py-2 rounded-md text-white w-fit disabled:bg-slate-400"
              onClick={applyToJob}
              disabled={isPending || loading}
            >
              {t('Aplicar')}
            </button>
          </DataSuspense>
        )}
        <div className="flex flex-col gap-2 text-left [&>*]:pb-4 [&>*]:border-b [&>*]:border-b-black [&>*]:border-opacity-20">
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
