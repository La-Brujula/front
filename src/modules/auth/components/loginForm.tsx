import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import { useAuth } from '@shared/context/auth';
import { AuthError } from 'firebase/auth';

export const LoginForm = () => {
  const { t } = useTranslation('auth');
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const [errorMsg, setErrorMsg] = useState('');

  const onError = (err: { code: string }) => {
    setLoading(false);
    switch (err.code) {
      case 'auth/user-not-found':
        setErrorMsg('Las credenciales están erróneas.');
        break;
      case 'auth/wrong-password':
        setErrorMsg('Las credenciales están erróneas.');
        break;
      case 'auth/no-account':
        setErrorMsg('No hay una cuenta registrada con ese correo.');
        break;
      default:
        setErrorMsg('Ocurrió un error.');
        console.error(err);
        break;
    }
  };

  const login = async (values: FieldValues) => {
    if (loading) return;
    if (!values.email || !values.password) return;
    setLoading(true);
    if (await auth.login(values.email, values.password, onError)) {
      navigate(`/usuarios/${values.email}`);
    }
    setLoading(false);
  };

  return (
    <>
      <form
        className="flex flex-col gap-4 lg:gap-8 justify-center items-center max-w-xs w-full mx-auto"
        onSubmit={handleSubmit(login)}
      >
        <div className="flex flex-col gap-2 items-start w-full">
          <label
            htmlFor="email"
            className="block"
          >
            {t('email')}
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            placeholder={t('ejemplo@labrujula.com')}
            autoComplete="email"
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-2 items-start w-full">
          <label htmlFor="password">{t('password')}</label>
          <input
            {...register('password')}
            id="password"
            type="password"
            placeholder={t('password')}
            autoComplete="password"
            className="w-full"
          />
        </div>
        {errorMsg === '' ? <></> : <p style={{ color: 'red' }}>{errorMsg}</p>}
        {!loading ? (
          <input
            type="submit"
            className="max-w-xs mx-auto mt-2 lg:mt-8 bg-primary"
            onClick={login}
            value={t('Inicia sesión')}
          />
        ) : (
          <LoadingSpinner />
        )}
      </form>
      <div className="flex flex-col gap-2 mt-4 text-primary">
        <NavLink
          to="/crear-usuario"
          className="max-w-xs mx-auto mt-2 bg-secondary px-4 py-2 text-white rounded-md"
        >
          {t('createUser')}
        </NavLink>
        <NavLink to="/reset-password">{t('forgotPassword')}</NavLink>
      </div>
    </>
  );
};