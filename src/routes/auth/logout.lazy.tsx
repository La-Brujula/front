import { useAuth } from '@/shared/providers/authProvider';
import { Container } from '@shared/layout/container';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/auth/logout')({
  component: LogoutPage,
});

function LogoutPage() {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const { logout } = useAuth(['logout']);
  useEffect(() => {
    logout();
    navigate({ to: '/' });
  }, []);

  return (
    <Container bg="light">
      <h1 className="mb-8">{t('logout')}</h1>
    </Container>
  );
}
