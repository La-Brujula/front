import { useCallback } from 'react';

import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import JobCreationForm from '@/modules/jobs/components/jobForm';
import { useCreateJob } from '@/modules/jobs/queries/jobSearchQuery';
import { TJobPosting } from '@/modules/jobs/types/searchParams';
import { Search } from '@/modules/search/types/searchParams';
import DataSuspense from '@/shared/components/dataSuspense';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { Container } from '@/shared/layout/container';

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
          onSubmit={onSubmit}
          isPending={isPending}
        />
      </DataSuspense>
    </Container>
  );
}
