import { Outlet } from 'react-router-dom';
import { ProfileBadge } from '../../profile/components/profileBadge';

export const BaseStepPage = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <ProfileBadge />
      <div className="mb-8"></div>
      <Outlet />
    </div>
  );
};
