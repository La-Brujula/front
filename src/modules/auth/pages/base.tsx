import { ProfileBadge } from '@modules/profile/components/profileBadge';
import ErrorMessage from '@shared/components/errorMessage';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import { useAuth } from '@shared/context/auth';
import { useUserInfo } from '@shared/hooks/useUserInfo';
import { brujulaUtils } from '@shared/utils/brujulaUtils';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const BaseStepPage = () => {
  const brujula = brujulaUtils();
  const { user, loading, error } = useUserInfo(brujula.getCurrentUserEmail());

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate('/iniciar-sesion');
  }, []);

  return loading ? (
    <LoadingSpinner />
  ) : error || user == undefined ? (
    <ErrorMessage message={(error || 'Could not find user').toString()} />
  ) : (
    <div className="max-w-3xl mx-auto">
      <ProfileBadge user={user} />
      <div className="mb-8"></div>
      <Outlet />
    </div>
  );
};

export default BaseStepPage;
