import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useCallback } from 'react';
import { Search } from '@/modules/search/types/searchParams';
import { Container } from '@/shared/layout/container';
import JobCreationForm from '@/modules/jobs/components/jobForm';
import { useTranslation } from 'react-i18next';
import { useCreateJob } from '@/modules/jobs/queries/jobSearchQuery';
import DataSuspense from '@/shared/components/dataSuspense';
import { TJobPosting } from '@/modules/jobs/types/searchParams';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';

export const Route = createLazyFileRoute('/jobs/create')({
  component: CreateJobPostingPage,
});

function CreateJobPostingPage() {
  const { t } = useTranslation('jobs');
  const { mutate, isPending, error } = useCreateJob();
  const navigate = useNavigate();
  const onSubmit = useCallback(
    (data: TJobPosting) => {
      mutate(data, {
        onSuccess: () =>
          navigate({
            to: '/jobs',
            resetScroll: true,
          }),
      });
    },
    [navigate]
  );

  return (
    <Container className="relative">
      <h1>{t('Crear oferta laboral')}</h1>
      <DataSuspense
        loading={isPending}
        error={error}
        fallback={<LoadingSpinner />}
      >
        <JobCreationForm
          onCreate={onSubmit}
          isPending={isPending}
        />
      </DataSuspense>
    </Container>
  );
}
