import { Outlet } from 'react-router-dom';
import { ProfileBadge } from '../../profile/components/profileBadge';

export const BaseStepPage = () => {
  return (
    <>
      <ProfileBadge
        user={{
          profilePicture: import.meta.env.BASE_URL + 'placeholder.svg',
          username: 'La Quina',
          location: 'Acapulco, Gro.',
        }}
      />
      <div className="mb-8"></div>
      <Outlet />
    </>
  );
};
