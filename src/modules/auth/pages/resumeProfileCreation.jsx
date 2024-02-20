import { ProfileHeader } from '@modules/profile/components/profileHeader';
import { useUserInfo } from '@shared/hooks/useUserInfo';

export const ResumeProfile = () => {
  const { user, loading, error } = useUserInfo();
  return (
    <>
      <ProfileHeader user={user} />
    </>
  );
};
