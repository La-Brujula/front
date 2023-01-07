import { useTranslation } from 'react-i18next';
import { LoginForm } from '@modules/auth/components/loginForm';
import { CurrentUserBadge } from './currentUserBadge';
import { useAuth } from '@shared/context/firebaseContext';

export const LoginOrProfile = () => {
  const { t } = useTranslation('landing');
  const { isLoggedIn } = useAuth();

  return (
    <div className="bg-primary bg-opacity-20 py-8 px-8 grow text-center w-full">
      {!isLoggedIn ? (
        <>
          <h2 className="mb-4">{t('¡Hola! Inicia sesión')}</h2>
          <LoginForm color="lightblue" />
        </>
      ) : (
        <CurrentUserBadge />
      )}
    </div>
  );
};
