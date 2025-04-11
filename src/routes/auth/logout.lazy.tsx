import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/shared/providers/authProvider';

import { Container } from '@shared/layout/container';

export const Route = createLazyFileRoute('/auth/logout')({
  component: LogoutPage,
});

function LogoutPage() {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const { logout } = useAuth(['logout']);
  const queryClient = useQueryClient();
  useEffect(() => {
    logout();
    queryClient.removeQueries({ queryKey: ['profiles', 'me'] });
    navigate({ to: '/', resetScroll: true });
  }, []);

  return (
    <Container bg="light">
      <h1 className="mb-8">{t('logout')}</h1>
    </Container>
  );
}
