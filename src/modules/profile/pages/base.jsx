import { ProfileBar } from '../components/profileBar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@shared/context/firebaseContext';

export const BaseProfilePage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) navigate('/iniciar-sesion');
  }, []);

  return (
    <>
      {/* <ProfileBar /> */}
      <Outlet />
    </>
  );
};
