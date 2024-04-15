import ErrorMessage from '@/shared/components/errorMessage';
import { ErrorComponentProps, createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { z } from 'zod';

export const searchSchema = z.object({
  code: z.string(),
  email: z.string(),
});

export type SearchParams = z.infer<typeof searchSchema>;

export const Route = createFileRoute('/auth/new-password')({
  validateSearch: (search) => searchSchema.parse(search),
  errorComponent: ChangePasswordError,
});

function ChangePasswordError(props: ErrorComponentProps) {
  const { t } = useTranslation('auth');
  return (
    <ErrorMessage
      message={t('Algo está mal aquí, por favor intenta de nuevo')}
    />
  );
}
