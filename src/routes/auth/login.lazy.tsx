import { createLazyFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Container } from '@shared/layout/container';

import { LoginForm } from '@modules/auth/components/loginForm';

export const Route = createLazyFileRoute('/auth/login')({
  component: LoginPage,
});

function LoginPage() {
  const { t } = useTranslation('auth');
  return (
    <Container bg="light">
      <h1 className="mb-8 text-4xl text-secondary">{t('login')}</h1>
      <LoginForm redirectUrl={Route.useSearch().redirect} />
    </Container>
  );
}
