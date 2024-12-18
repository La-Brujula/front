import { useLoggedInAccount } from '@/shared/hooks/useLoggedInAccount';
import { Container } from '@/shared/layout/container';
import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/auth/verify-email')({
  component: React.memo(VerifyEmail),
});

function VerifyEmail() {
  const { t } = useTranslation('auth');
  const account = useLoggedInAccount();
  const navigate = useNavigate();
  useEffect(() => {
    const navigateCallback = setTimeout(
      () =>
        account !== null
          ? navigate({ to: '/profile/$userId', params: { userId: 'me' } })
          : navigate({ to: '/auth/login' }),
      2000
    );
    return () => clearTimeout(navigateCallback);
  }, [account, navigate]);

  return (
    <Container
      bg="light"
      className="min-h-96"
    >
      <div className="bg-emerald-500 bg-opacity-25 border border-emerald-500">
        <h2>{t('Se verificó tu correo existósamente')}</h2>
        <Link
          to={account !== null ? '/profile/$userId' : '/auth/login'}
          params={{ userId: account !== null ? 'me' : undefined }}
        >
          <p>{t('Haz click aquí para regresar a tu perfil')}</p>
        </Link>
      </div>
    </Container>
  );
}
