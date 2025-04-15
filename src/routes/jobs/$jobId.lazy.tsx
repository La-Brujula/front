import { useMemo } from 'react';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { Link, createLazyFileRoute } from '@tanstack/react-router';
import { ChevronLeftIcon, EditIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import Applicants from '@/modules/jobs/components/applicants';
import DeleteOpening from '@/modules/jobs/components/deleteOpening';
import { jobDetailOptions } from '@/modules/jobs/queries/jobSearchQuery';
import { UserCard } from '@/modules/search/components/userCard';
import DataSuspense from '@/shared/components/dataSuspense';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { useLoggedInAccount } from '@/shared/hooks/useLoggedInAccount';
import { Container } from '@/shared/layout/container';
import { getTitle } from '@/shared/utils/areaUtils';

// i18next-parser static types

// Proficiency
// t('common:basic')
// t('common:intermediate')
// t('common:advanced')
// t('common:native')

// Languages
// t("common:es")
// t("common:en")
// t("common:fr")
// t("common:de")
// t("common:it")
// t("common:zh")

export const Route = createLazyFileRoute('/jobs/$jobId')({
  component: JobDetailPage,
  pendingComponent: LoadingSpinner,
});

export function JobDetailPage() {
  const { jobId } = Route.useParams();
  const { t } = useTranslation('jobs');
  const loggedInAccount = useLoggedInAccount();

  const queryOptions = useMemo(() => jobDetailOptions(jobId), [jobId]);

  const {
    data: job,
    isLoading: loading,
    error,
  } = useSuspenseQuery(queryOptions);

  const ownOpening = useMemo(() => {
    if (job === undefined || loggedInAccount === null) return false;
    return loggedInAccount?.ProfileId === job.requester.id;
  }, [loggedInAccount, job, loading]);

  return (
    <>
      <Container
        bg="light"
        bodyClass="grid sm:grid-cols-[4rem_1fr_4rem] items-center"
        className="!p-4"
      >
        <Link
          to="/jobs"
          className="flex flex-row gap-1"
        >
          <ChevronLeftIcon />
          {t('Regresar')}
        </Link>
        <h1 className="text-center text-4xl font-normal text-primary">
          {t('Oferta laboral')}
        </h1>
        {ownOpening ? (
          <Link
            to="/jobs/$jobId/edit"
            params={{ jobId }}
            className="flex flex-row gap-1"
          >
            <EditIcon />
            {t('Editar')}
          </Link>
        ) : (
          <div />
        )}
      </Container>
      <Container bodyClass="grid justify-center">
        <DataSuspense
          loading={loading}
          error={error}
          key={jobId}
        >
          {job?.requester && (
            <UserCard
              user={job.requester}
              showRecommendations={false}
            />
          )}
          <div className="mx-auto mb-4 w-full max-w-lg items-start justify-start px-8 xl:max-w-4xl">
            <div className="order-last flex flex-col xl:order-first xl:shrink xl:flex-row xl:gap-16">
              <div className="xl:-translate-y-42 mx-auto mt-8 flex w-full max-w-lg flex-col justify-items-stretch gap-6 text-left xl:mx-0 xl:max-w-3xl">
                {!!job?.activity && (
                  <div>
                    <h2 className="text-xl font-normal text-primary">
                      {t('Busca {{count}} {{title}}', {
                        replace: {
                          count: job.count,
                          title: getTitle(job.activity, job.gender || 'other'),
                        },
                      })}
                    </h2>
                  </div>
                )}
                {!!job?.description && (
                  <div>
                    <h4 className="font-normal text-primary">
                      {t('Description')}
                    </h4>
                    <p>{job.description}</p>
                  </div>
                )}
                {!!job?.createdAt && (
                  <div>
                    <h4 className="font-normal text-primary">
                      {t('Fecha de publicación')}
                    </h4>
                    <p>{job.createdAt.toLocaleDateString()}</p>
                  </div>
                )}
                {!!job?.jobStartDate && (
                  <div>
                    <h4 className="font-normal text-primary">
                      {t('Fecha de inicio')}
                    </h4>
                    <p>{job.jobStartDate.toLocaleDateString()}</p>
                  </div>
                )}
                {!!job?.location && (
                  <div>
                    <h4 className="font-normal text-primary">
                      {t('Tipo de empleo')}
                    </h4>
                    <p>
                      {t(job.location)}
                      {!!job?.employment && ` - ${t(job.employment)}`}
                    </p>
                  </div>
                )}
                {!!job?.probono && (
                  <div>
                    <h4 className="font-normal text-primary">
                      {t('Trabajo remunerado')}
                    </h4>
                    <p>{t(!job.probono ? 'Sí' : 'No')}</p>
                  </div>
                )}
                {!!job?.requester.location && (
                  <div>
                    <h4 className="font-normal text-primary">
                      {t('Ubicación')}
                    </h4>
                    <p>{job.requester.location}</p>
                  </div>
                )}
                {!!job?.notes && (
                  <div>
                    <h4 className="font-normal text-primary">{t('Notes')}</h4>
                    <p>{job.notes}</p>
                  </div>
                )}
                {!!job?.benefits && (
                  <div>
                    <h4 className="font-normal text-primary">
                      {t('Benefits')}
                    </h4>
                    <p>{job.benefits}</p>
                  </div>
                )}
                {!!job?.specialRequirements && (
                  <div>
                    <h4 className="font-normal text-primary">
                      {t('Special Requirements')}
                    </h4>
                    <p>{job.specialRequirements}</p>
                  </div>
                )}
                <div className="mt-4"></div>
                {ownOpening && <DeleteOpening jobId={jobId} />}
              </div>
            </div>
          </div>
        </DataSuspense>
        <Applicants
          jobId={jobId}
          ownOpening={ownOpening}
        />
      </Container>
    </>
  );
}
