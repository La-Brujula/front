import { useCallback, useState } from 'react';

import { useNavigate } from '@tanstack/react-router';
import { TrashIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import DataSuspense from '@/shared/components/dataSuspense';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';

import { useDeleteJob } from '../queries/jobSearchQuery';

export default function DeleteOpening(props: { jobId: string }) {
  const { t } = useTranslation('jobs');
  const navigate = useNavigate();

  const { mutate, isPending, error } = useDeleteJob();
  const [pressed, setPressed] = useState(false);
  const deleteJob = useCallback(() => {
    if (!pressed) return setPressed(true);
    mutate(props.jobId, {
      onSuccess: () => {
        navigate({ to: '/jobs' });
      },
    });
  }, [props.jobId, mutate, pressed]);
  return (
    <DataSuspense
      loading={isPending}
      error={error}
      fallback={<LoadingSpinner />}
    >
      {pressed && (
        <p>
          {t('Estás a punto de borrar esta oferta, esto no puede deshacerse')}
        </p>
      )}
      <Button
        onClick={deleteJob}
        className="mx-auto flex w-fit flex-row items-center gap-2 bg-red-500 px-4 py-2 text-white"
      >
        <TrashIcon />
        {!pressed ? t('Borrar oferta') : t('Confirmar')}
      </Button>
    </DataSuspense>
  );
}
