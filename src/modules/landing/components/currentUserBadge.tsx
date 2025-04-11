import { Link } from '@tanstack/react-router';

import DataSuspense from '@/shared/components/dataSuspense';
import { useProfile } from '@/shared/hooks/useUser';

import ErrorMessage from '@shared/components/errorMessage';

import { ProfileBadge } from '@modules/profile/components/profileBadge';

export const CurrentUserBadge = () => {
  const { data: user, isLoading, error } = useProfile('me');
  return (
    <DataSuspense
      loading={isLoading}
      error={error}
      errorComponent={
        <ErrorMessage message={error?.message || 'Could not find user'} />
      }
    >
      {user !== undefined && (
        <Link
          to="/profile/$userId"
          params={{ userId: user.id || '' }}
          resetScroll
        >
          <ProfileBadge user={user} />
        </Link>
      )}
    </DataSuspense>
  );
};
