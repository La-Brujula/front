import { verifyEmail } from '@/modules/auth/hooks/emailVerification';
import { ErrorMessage } from '@/shared/components/errorMessage';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { Container } from '@/shared/layout/container';
import { ApiError } from '@/shared/services/backendFetcher';
import { createFileRoute, ErrorComponentProps } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

const verifyEmailSchema = z.object({
  code: z.string().length(32, 'Badly formatted code, please check again'),
  email: z.string().email(),
});

export type VerifySchema = z.infer<typeof verifyEmailSchema>;

export const Route = createFileRoute('/auth/verify-email')({
  validateSearch: verifyEmailSchema.parse,
  loaderDeps: (opts) => opts.search,
  loader: async (match) => {
    await verifyEmail(match.deps.code, match.deps.email).then(
      (res) => res.entity
    );
    match.context.queryClient.invalidateQueries({
      queryKey: ['profiles', 'me'],
    });
  },
  errorComponent: WrongCode,
  pendingComponent: LoadingSpinner,
});

function WrongCode({ error }: ErrorComponentProps) {
  const { t } = useTranslation('auth');

  return (
    <Container
      bg="blue"
      className="text-white min-h-96"
    >
      <h1>{t('Algo salió mal')}</h1>
      {(error !== undefined && (
        <ErrorMessage message={(error as ApiError)?.errorCode || 'AE-VE'} />
      )) || (
        <p className="text-xl">
          {t(
            'La liga para esta página no es válida. Por favor intenta de nuevo'
          )}
        </p>
      )}
    </Container>
  );
}
