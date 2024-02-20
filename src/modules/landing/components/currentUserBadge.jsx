import { ProfileBadge } from '@modules/profile/components/profileBadge';
import ErrorMessage from '@shared/components/errorMessage';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import { useUserInfo } from '@shared/hooks/useUserInfo';
import { brujulaUtils } from '@shared/utils/brujulaUtils';
import { NavLink } from 'react-router-dom';

export const CurrentUserBadge = () => {
  const brujula = brujulaUtils();
  const { user, loading, error } = useUserInfo(brujula.getCurrentUserEmail());
  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <ErrorMessage message={error.toString()} />
  ) : (
    <NavLink to={`/usuarios/${brujula.getCurrentUserEmail()}`}>
      <ProfileBadge user={user} />
    </NavLink>
  );
};
