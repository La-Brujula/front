import { useAuth } from '@shared/context/firebaseContext';
import { useUserInfo } from '@shared/hooks/useUserInfo';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfilePage } from './landing';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import { ErrorMessage } from '@shared/components/errorMessage';

export const CurrentUserPage = () => {
  const { isLoggedIn, getUserEmail } = useAuth();
  const { user, loading, error } = useUserInfo(getUserEmail());
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) return navigate('/iniciar-sesion');
  }, []);

  return loading ? (
    <LoadingSpinner />
  ) : error || !user ? (
    <ErrorMessage message={error?.toString() || 'No user found'} />
  ) : (
    <UserProfilePage user={user} />
  );
};

export default CurrentUserPage;
