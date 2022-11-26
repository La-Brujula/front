import { Container } from '@shared/layout/container';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@shared/context/firebaseContext';
import { useEffect } from 'react';

export default () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const auth = useAuth();
  useEffect(() => {
    auth.logout()
    navigate("/");
  }, [])
  
  return (
    <Container bg="light">
      <h1 className="mb-8">{t('logout')}</h1>
    </Container>
  );
};
