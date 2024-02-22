import { useAuth } from '@shared/context/auth';
import { Navigate } from 'react-router-dom';

export const CurrentUserPage = () => {
  const { isLoggedIn, getUserEmail } = useAuth();

  return !isLoggedIn ? (
    <Navigate to="/iniciar-sesion" />
  ) : (
    <Navigate
      to={`/usuarios/${getUserEmail()}`}
      replace={true}
    />
  );
};

export default CurrentUserPage;
