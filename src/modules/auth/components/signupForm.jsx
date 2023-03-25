import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { AuthContext } from '@shared/context/firebaseContext';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { brujulaUtils } from '@shared/utils/brujulaUtils';
import { PrivacyPolicy } from './privacyPolicy';
import { LoadingSpinner } from '../../../shared/components/loadingSpinner';


export const SignupForm = () => {
  const auth = useContext(AuthContext);
  const brujula = brujulaUtils();
  const { register, handleSubmit, setValue, watch } = useForm();
  const tipoDePersona = watch('persona', 'fisica');
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const acceptedPrivacy = watch('acceptPrivacy');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    if (loading) return;
    if (!data.email || !data.password) return
    setLoading(true);
    setErrorMsg('');
    if (await auth.register(data.email, data.password, onError)) {
      await brujula.updateUserInfo({ type: tipoDePersona });
      navigate('basica');
    }
    setLoading(false);
  };

  const onError = (err) => {
    setLoading(false)
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
    <form
      onSubmit={handleSubmit(onSubmit, (err) => {
        console.error(err);
      })}
      className="flex flex-col gap-4"
    >
      <input type="hidden" {...register('persona')} required />
      <div className="flex flex-col gap-4">
        <label>{t('¿Eres persona física o persona moral?')}</label>
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
            {t('Persona física')}
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
            {t('Persona moral')}
          </button>
        </div>
  
      </div>
      <div className="flex flex-col md:items-center gap-8 justify-stretch mb-12">
        <div className="flex flex-col gap-2 items-start grow max-w-xs w-full">
          <label htmlFor="email" className="block">
            {t('Tu correo electrónico será tu nombre de usuario')}
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
        <div className="flex flex-col gap-2 items-start grow max-w-xs w-full">
          <label htmlFor="password">{t('Escribe una contraseña')}</label>
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
      {acceptedPrivacy !== true && <PrivacyPolicy />}
      {!loading ? <input
        type="submit"
        className="max-w-xs mx-auto bg-primary"
        value={t('Crear usuario')}
      /> : <LoadingSpinner />}
      <p>
        {t('¿Ya tienes una cuenta?')}&nbsp;
        <NavLink to="/iniciar-sesion" className="mt-4">
          {t('Inicia Sesión')}
        </NavLink>
      </p>
    </form>
  );
};
