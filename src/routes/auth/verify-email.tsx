import { verifyEmail } from '@/modules/auth/hooks/emailVerification';
import { ErrorMessage } from '@/shared/components/errorMessage';
import { Container } from '@/shared/layout/container';
import { ApiError, BackendResponse } from '@/shared/services/backendFetcher';
import { createFileRoute, ErrorComponentProps } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

const verifyEmailSchema = z.object({
  code: z.string().length(32, 'Badly formatted code, please check again'),
});

export type VerifySchema = z.infer<typeof verifyEmailSchema>;

export const Route = createFileRoute('/auth/verify-email')({
  validateSearch: (search) => verifyEmailSchema.parse(search),
  errorComponent: WrongCode,
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
        <ErrorMessage
          message={
            (error as AxiosError<{ error: ApiError }>)?.response?.data?.error
              ?.errorCode || 'AE-VE'
          }
        />
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
