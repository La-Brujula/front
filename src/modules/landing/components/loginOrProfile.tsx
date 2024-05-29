import { LoginForm } from '@modules/auth/components/loginForm';
import { useTranslation } from 'react-i18next';
import { CurrentUserBadge } from './currentUserBadge';
import { useLoggedInAccount } from '@/shared/hooks/useLoggedInAccount';

export const LoginOrProfile = () => {
  const { t } = useTranslation('landing');
  const loggedInAccount = useLoggedInAccount();

  return (
    <div className="bg-primary bg-opacity-20 py-8 px-8 grow text-center w-full">
      {loggedInAccount === null ? (
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
