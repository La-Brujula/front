import { useCurrentUser } from '@shared/hooks/useCurrentUser';
import { ProfileHeader } from '@modules/profile/components/profileHeader';

export const ResumeProfile = () => {
  const { user, loading, error } = useCurrentUser();
  return (
    <>
      <ProfileHeader user={user} />
    </>
  );
};
