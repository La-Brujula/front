import JobEditingForm from '@/modules/jobs/components/jobEditingForm';
import {
  JobDetailDTO,
  jobDetailOptions,
  useUpdateJob,
} from '@/modules/jobs/queries/jobSearchQuery';
import DataSuspense from '@/shared/components/dataSuspense';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { Container } from '@/shared/layout/container';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/jobs_/$jobId/edit')({
  component: EditJobPostingPage,
});

function EditJobPostingPage() {
  const { t } = useTranslation('jobs');

  const { jobId } = Route.useParams();

  const {
    data: job,
    isLoading,
    error: jobError,
  } = useQuery(jobDetailOptions(jobId));
  const { mutate, isPending, error } = useUpdateJob(jobId);

  const navigate = useNavigate();
  const onSubmit = useCallback(
    (data: JobDetailDTO) => {
      mutate(data, {
        onSuccess: () =>
          navigate({
            to: '/jobs/$jobId',
            params: { jobId },
            resetScroll: true,
          }),
      });
    },
    [navigate]
  );

  return (
    <Container className="relative">
      <h1>{t('Editar oferta laboral')}</h1>
      <DataSuspense
        loading={isPending || isLoading}
        error={error || jobError}
        fallback={<LoadingSpinner />}
      >
        <JobEditingForm
          onSubmit={onSubmit}
          isPending={isPending}
          initialValues={job}
        />
      </DataSuspense>
    </Container>
  );
}
