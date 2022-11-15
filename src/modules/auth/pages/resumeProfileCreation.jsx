import { useUserInfo } from '@shared/hooks/useUserInfo';
import { ProfileHeader } from '@modules/profile/components/profileHeader';

export const ResumeProfile = () => {
  const { user, loading, error } = useUserInfo();
  return (
    <>
      <ProfileHeader user={user} />
    </>
  );
};
