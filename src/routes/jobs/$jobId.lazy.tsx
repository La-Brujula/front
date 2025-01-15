import { useTranslation } from 'react-i18next';
import { ContactSection } from '@/modules/profile/components/contactInfo';
import { Recommendations } from '@/modules/profile/components/recommend';
import { Link, createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import DataSuspense from '@/shared/components/dataSuspense';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { jobDetailOptions } from '@/modules/jobs/queries/jobSearchQuery';
import { Container } from '@/shared/layout/container';
import { getTitle } from '@/shared/utils/areaUtils';
import Applicants from '@/modules/jobs/components/applicants';
import { ArrowBackIosOutlined } from '@mui/icons-material';
import { UserCard } from '@/modules/search/components/userCard';

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
  pendingComponent: PendingUserProfilePage,
});

function PendingUserProfilePage() {
  return <LoadingSpinner />;
}

export function JobDetailPage() {
  const { jobId } = Route.useParams();
  const { t } = useTranslation('jobs');

  const queryOptions = useMemo(() => jobDetailOptions(jobId), [jobId]);

  const { data: job, isLoading: loading, error } = useQuery(queryOptions);

  return (
    <>
      <Container
        bg="light-gray"
        bodyClass="grid grid-cols-[2rem_1fr_2rem] items-center"
        className="!p-4"
      >
        <Link
          to="/jobs"
          className="flex flex-row gap-1"
        >
          <ArrowBackIosOutlined />
          {t('Regresar')}
        </Link>
        <h1 className="font-normal text-primary text-4xl">
          {t('Oferta laboral')}
        </h1>
        <div></div>
      </Container>
      <Container
        bg="light"
        bodyClass="grid justify-center"
      >
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
          <div className="max-w-lg xl:max-w-4xl mx-auto px-8 w-full justify-start items-start mb-4">
            <div className="flex flex-col xl:flex-row xl:gap-16 order-last xl:order-first xl:shrink">
              <div
                className="flex flex-col gap-6 w-full justify-items-stretch mt-8 max-w-lg
              xl:max-w-3xl mx-auto xl:mx-0 text-left xl:-translate-y-42"
              >
                {!!job?.activity && (
                  <div>
                    <h2 className="font-normal text-primary text-xl">
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
              </div>
            </div>
          </div>
        </DataSuspense>
        <Applicants jobId={jobId} />
      </Container>
    </>
  );
}
