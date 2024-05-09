import { LoginForm } from '@modules/auth/components/loginForm';
import { useAuth } from '@shared/providers/authProvider';
import { useTranslation } from 'react-i18next';
import { CurrentUserBadge } from './currentUserBadge';

export const LoginOrProfile = () => {
  const { t } = useTranslation('landing');
  const { isLoggedIn } = useAuth(['isLoggedIn']);

  return (
    <div className="bg-primary bg-opacity-20 py-8 px-8 grow text-center w-full">
      {!isLoggedIn ? (
        <>
          <h2 className="mb-4">{t('¡Hola! Inicia sesión')}</h2>
          <LoginForm />
        </>
      ) : (
        <CurrentUserBadge />
      )}
    </div>
  );
};
