import { useUserInfo } from '@shared/hooks/useUserInfo';
import { brujulaUtils } from '@shared/utils/brujulaUtils';
import { ProfileBadge } from '@modules/profile/components/profileBadge';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import { ErrorMessage } from '@shared/components/errorMessage';

export const CurrentUserBadge = () => {
  const brujula = brujulaUtils();
  const { user, loading, error } = useUserInfo(brujula.getCurrentUserEmail());
  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <ErrorMessage message={error.toString()} />
  ) : (
    <ProfileBadge user={user} />
  );
};
