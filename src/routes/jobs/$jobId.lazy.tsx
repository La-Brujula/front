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

  const queryOptions = useMemo(() => jobDetailOptions(jobId), [jobId]);

  const { data: job, isLoading: loading, error } = useQuery(queryOptions);
  const { t } = useTranslation('jobs');

  return (
    <Container>
      <DataSuspense
        loading={loading}
        error={error}
        key={jobId}
      >
        <h1 className="font-normal text-primary">{t('Oferta laboral')}</h1>
        <div className="max-w-lg xl:max-w-4xl mx-auto px-8 w-full justify-start items-start mb-4">
          <div className="flex flex-col xl:flex-row xl:gap-16 order-last xl:order-first xl:shrink">
            <div
              className="flex flex-col gap-6 w-full justify-items-stretch mt-8 max-w-lg
            xl:max-w-3xl mx-auto xl:mx-0 text-left xl:-translate-y-42"
            >
              {!!job?.activity && (
                <div>
                  <h4 className="font-normal text-primary">{t('Buscando')}</h4>
                  <p className="text-lg">
                    {job.count} {getTitle(job.activity)}
                  </p>
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
              {!!job?.notes && (
                <div>
                  <h4 className="font-normal text-primary">{t('Notes')}</h4>
                  <p>{job.notes}</p>
                </div>
              )}
              {!!job?.benefits && (
                <div>
                  <h4 className="font-normal text-primary">{t('Benefits')}</h4>
                  <p>{job.benefits}</p>
                </div>
              )}
              {!!job?.employment && (
                <div>
                  <h4 className="font-normal text-primary">
                    {t('Employment')}
                  </h4>
                  <p>{job.employment}</p>
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
              <div className="flex flex-col gap-4 justify-items-stretch mt-8 max-w-sm w-full mx-auto text-left">
                {!!job?.probono && (
                  <div className="py-8">
                    <div className="absolute left-0 -z-10 -my-4 overflow-hidden transform w-full">
                      <div className="bg-black bg-opacity-20 w-full h-20 xl:w-1/2 xl:rounded-r-md"></div>
                    </div>
                    <h4 className="font-normal text-primary">
                      {t('Trabajo no remunerado')}
                    </h4>
                    <p>{t('Sí')}</p>
                  </div>
                )}
              </div>
              <div className="my-8"></div>
            </div>
          </div>
        </div>
      </DataSuspense>
    </Container>
  );
}
