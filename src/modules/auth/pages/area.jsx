import { ProfileBadge } from '../../profile/components/profileBadge';
import { AreaForms } from '../components/areaForm';

export const AreaPage = () => {
  return (
    <>
      <ProfileBadge
        user={{
          profilePicture: './placeholder.svg',
          username: 'La Quina',
          location: 'Acapulco, Gro.',
        }}
      />
      <AreaForms />
    </>
  );
};
