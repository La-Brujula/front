import { Container } from '@shared/layout/container';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '../components/loginForm';

export default () => {
  const { t } = useTranslation('auth');
  return (
    <Container bg="light">
      <h1 className="mb-8">{t('login')}</h1>
      <LoginForm />
    </Container>
  );
};
