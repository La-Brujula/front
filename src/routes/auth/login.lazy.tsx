import { Container } from '@shared/layout/container';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '@modules/auth/components/loginForm';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/auth/login')({
  component: LoginPage,
});

function LoginPage() {
  const { t } = useTranslation('auth');
  return (
    <Container bg="light">
      <h1 className="mb-8 text-secondary text-4xl">{t('login')}</h1>
      <LoginForm />
    </Container>
  );
}
