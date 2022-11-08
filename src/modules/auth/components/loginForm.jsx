import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
export const LoginForm = () => {
  const { t } = useTranslation('auth');
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-baseline gap-8 justify-center items-stretch w-full">
        <div className="flex flex-col gap-2 items-start">
          <label htmlFor="email" className="block">
            {t('email')}
          </label>
          <input
            id="email"
            type="email"
            placeholder={t('email')}
            autoComplete="email"
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-2 items-start">
          <label htmlFor="email">{t('password')}</label>
          <input
            id="password"
            type="password"
            placeholder={t('email')}
            autoComplete="password"
            className="w-full"
          />
        </div>
      </div>
      <button className="max-w-xs mx-auto mt-8 bg-primary">{t('login')}</button>
      <div className="flex flex-col gap-2 mt-4 text-primary">
        <NavLink to={import.meta.env.BASE_URL + 'crear-usuario'}>
          {t('createUser')}
        </NavLink>
        <NavLink to={import.meta.env.BASE_URL + 'reiniciar-contraseña'}>
          {t('forgotPassword')}
        </NavLink>
      </div>
    </>
  );
};
