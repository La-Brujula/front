import { useAuth } from '@shared/context/firebaseContext';
import { Container } from '@shared/layout/container';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const auth = useAuth();
  useEffect(() => {
    auth.logout();
    navigate('/');
  }, []);

  return (
    <Container bg="light">
      <h1 className="mb-8">{t('logout')}</h1>
    </Container>
  );
};
