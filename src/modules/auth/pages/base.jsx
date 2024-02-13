import { Outlet, useNavigate } from 'react-router-dom';
import { useUserInfo } from '@shared/hooks/useUserInfo';
import { ProfileBadge } from '@modules/profile/components/profileBadge';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import ErrorMessage from '@shared/components/errorMessage';
import { brujulaUtils } from '@shared/utils/brujulaUtils';
import { useAuth } from '@shared/context/firebaseContext';
import { useEffect } from 'react';

export const BaseStepPage = () => {
  const brujula = brujulaUtils();
  const { user, loading, error } = useUserInfo(brujula.getCurrentUserEmail());

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) navigate('/iniciar-sesion');
  }, []);

  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <ErrorMessage message={error.toString()} />
  ) : (
    <div className="max-w-3xl mx-auto">
      <ProfileBadge user={user} />
      <div className="mb-8"></div>
      <Outlet />
    </div>
  );
};

export default BaseStepPage;
