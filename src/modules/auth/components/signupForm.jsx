import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { AuthContext } from '@shared/context/firebaseContext';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { brujulaUtils } from '@shared/utils/brujulaUtils';
import { PrivacyPolicy } from './privacyPolicy';

export const SignupForm = () => {
  const auth = useContext(AuthContext);
  const brujula = brujulaUtils();
  const { register, handleSubmit, setValue, watch } = useForm();
  const tipoDePersona = watch('persona', 'fisica');
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (data) => {
    setErrorMsg('');
    if (await auth.register(data.email, data.password, onError)) {
      brujula.updateUserInfo({ tipo: tipoDePersona });
      navigate('basica');
    }
  };

  const onError = (err) => {
    switch (err.code) {
      case 'auth/invalid-email':
        setErrorMsg('Ingresa un correo valido.');
        break;
      case 'auth/email-already-in-use':
        setErrorMsg('El correo ya esta registrado.');
        break;
      case 'auth/weak-password':
        setErrorMsg('La contraseña tiene que tener como minimo 6 caracteres.');
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input type="hidden" {...register('persona')} required />
      <div className="flex flex-col gap-4">
        <label>{t('personTypeQuestion')}</label>
        <div className="flex flex-row gap-4 items-center justify-center mb-4">
          <button
            className={[
              'outline outline-primary outline-1 px-8 py-4 rounded-lg cursor-pointer',
              tipoDePersona == 'fisica'
                ? 'bg-primary text-white'
                : 'bg-transparent text-primary',
            ].join(' ')}
            onClick={(ev) => {
              setValue('persona', 'fisica', {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              });
              ev.preventDefault();
            }}
          >
            {t('fiscalPerson')}
          </button>
          <button
            className={[
              'outline outline-primary outline-1 px-8 py-4 rounded-lg cursor-pointer',
              tipoDePersona == 'moral'
                ? 'bg-primary text-white'
                : 'bg-transparent text-primary',
            ].join(' ')}
            onClick={(ev) => {
              setValue('persona', 'moral', {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              });
              ev.preventDefault();
            }}
          >
            {t('moralPerson')}
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-baseline gap-8 justify-center">
        <div className="flex flex-col gap-2 items-start grow max-w-xs">
          <label htmlFor="email" className="block">
            {t('email')}
          </label>
          <input
            id="email"
            type="email"
            placeholder={t('email')}
            autoComplete="email"
            className="w-full"
            {...register('email')}
            required
          />
        </div>
        <div className="flex flex-col gap-2 items-start grow max-w-xs">
          <label htmlFor="password">{t('password')}</label>
          <input
            id="password"
            type="password"
            placeholder={t('password')}
            autoComplete="password"
            className="w-full"
            {...register('password')}
            required
          />
        </div>
      </div>
      {errorMsg === '' ? <></> : <p style={{ color: 'red' }}>{errorMsg}</p>}
      <input type="hidden" {...register('acceptPrivacy', { required: true })} />
      <PrivacyPolicy />
      <input
        type="submit"
        className="max-w-xs mx-auto mt-8 bg-primary"
        value={t('createUser')}
      />
      <p>
        {t('alreadyHaveAccount')}&nbsp;
        <NavLink to="iniciar-sesion" className="mt-4">
          {t('login')}
        </NavLink>
      </p>
    </form>
  );
};
