import { Outlet } from 'react-router-dom';
import { useCurrentUser } from '@shared/hooks/useCurrentUser';
import { ProfileBadge } from '@modules/profile/components/profileBadge';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import { ErrorMessage } from '@shared/components/errorMessage';

export const BaseStepPage = () => {
  const { user, loading, error } = useCurrentUser();
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
