import { useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '@shared/context/firebaseContext';

export const LoginForm = () => {
  const { t } = useTranslation('auth');
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const auth = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState('');

  const onError = (err) => {
    switch (err.code) {
      case 'auth/user-not-found':
        setErrorMsg('Las credenciales estan erroneas.');
        break;
    }
  };

  const login = async (values) => {
    if (!values.email || !values.password) return;
    if (await auth.login(values.email, values.password, onError)) {
      navigate('/perfil');
    }
  };

  return (
    <>
      <form
        className="flex flex-col gap-8 justify-center items-center max-w-xs w-full mx-auto"
        onSubmit={handleSubmit(login)}
      >
        <div className="flex flex-col gap-2 items-start w-full">
          <label htmlFor="email" className="block">
            {t('email')}
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            placeholder={t('email')}
            autoComplete="email"
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-2 items-start w-full">
          <label htmlFor="email">{t('password')}</label>
          <input
            {...register('password')}
            id="password"
            type="password"
            placeholder={t('email')}
            autoComplete="password"
            className="w-full"
          />
        </div>
        {errorMsg === '' ? <></> : <p style={{ color: 'red' }}>{errorMsg}</p>}
        <input
          type="submit"
          className="max-w-xs mx-auto mt-8 bg-primary"
          onClick={login}
          value={t('login')}
        />
      </form>
      <div className="flex flex-col gap-2 mt-4 text-primary">
        <NavLink to="/crear-usuario">{t('createUser')}</NavLink>
        <NavLink to="/reiniciar-contraseña">{t('forgotPassword')}</NavLink>
      </div>
    </>
  );
};
