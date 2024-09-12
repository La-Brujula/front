import DataSuspense from '@/shared/components/dataSuspense';
import { ErrorMessage } from '@/shared/components/errorMessage';
import { useCurrentProfile } from '@/shared/hooks/useCurrentProfile';
import { Container } from '@/shared/layout/container';
import { createLazyFileRoute, Link } from '@tanstack/react-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/auth/verify-email')({
  component: React.memo(VerifyEmail),
});

function VerifyEmail() {
  const { t } = useTranslation('auth');
  const { data: user, isLoading, error } = useCurrentProfile();

  return (
    <Container
      bg="light"
      className="min-h-96"
    >
      <DataSuspense
        loading={isLoading}
        error={error}
        fallback={<h1>{t('Cargando...')}</h1>}
      >
        {user?.verified ? (
          <div className="bg-emerald-500 bg-opacity-25 border border-emerald-500">
            <h2>{t('Se verificó tu correo existósamente')}</h2>
            <Link
              to="/profile/$userId"
              params={{ userId: 'me' }}
            >
              <p>{t('Haz click aquí para regresar a tu perfil')}</p>
            </Link>
          </div>
        ) : (
          <ErrorMessage message="AE-VE" />
        )}
      </DataSuspense>
    </Container>
  );
}
