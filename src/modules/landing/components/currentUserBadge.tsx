import DataSuspense from '@/shared/components/dataSuspense';
import { useProfile } from '@/shared/hooks/useUser';
import { ProfileBadge } from '@modules/profile/components/profileBadge';
import ErrorMessage from '@shared/components/errorMessage';
import { Link } from '@tanstack/react-router';

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
