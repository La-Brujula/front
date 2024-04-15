import DataSuspense from '@/shared/components/dataSuspense';
import { useLoggedInAccount } from '@/shared/hooks/useLoggedInAccount';
import { useProfile } from '@/shared/hooks/useUser';
import { ProfileBadge } from '@modules/profile/components/profileBadge';
import ErrorMessage from '@shared/components/errorMessage';
import { Link } from '@tanstack/react-router';

export const CurrentUserBadge = () => {
  const loggedInAccount = useLoggedInAccount();
  if (loggedInAccount === null)
    return <ErrorMessage message={'Could not find user'.toString()} />;
  const {
    data: user,
    isLoading,
    error,
  } = useProfile(loggedInAccount.ProfileId);
  return (
    <DataSuspense
      loading={isLoading}
      error={error}
      errorComponent={
        <ErrorMessage message={(error || 'Could not find user').toString()} />
      }
    >
      {user !== undefined && (
        <Link
          to="/profile/$userId"
          params={{ userId: user.id || '' }}
        >
          <ProfileBadge user={user} />
        </Link>
      )}
    </DataSuspense>
  );
};
