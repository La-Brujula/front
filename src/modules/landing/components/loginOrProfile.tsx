import { useTranslation } from 'react-i18next';

import { useLoggedInAccount } from '@/shared/hooks/useLoggedInAccount';

import { LoginForm } from '@modules/auth/components/loginForm';

import { CurrentUserBadge } from './currentUserBadge';

export const LoginOrProfile = () => {
  const { t } = useTranslation('landing');
  const loggedInAccount = useLoggedInAccount();

  return (
    <div className="w-full grow bg-primary-foreground p-8 text-center">
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
