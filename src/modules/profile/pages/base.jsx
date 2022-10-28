import { ProfileBar } from '../components/profileBar';
import { Container } from '@shared/layout/container';
import { Outlet } from 'react-router-dom';
export const BaseProfilePage = () => {
  return (
    <>
      <ProfileBar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};
