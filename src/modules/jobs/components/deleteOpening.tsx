import DataSuspense from '@/shared/components/dataSuspense';
import { useDeleteJob } from '../queries/jobSearchQuery';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { DeleteOutlined } from '@mui/icons-material';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';

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
      <button
        onClick={deleteJob}
        className="px-4 py-2 bg-red-500 text-white flex flex-row items-center gap-2 w-fit mx-auto"
      >
        <DeleteOutlined />
        {!pressed ? t('Borrar oferta') : t('Confirmar')}
      </button>
    </DataSuspense>
  );
}
