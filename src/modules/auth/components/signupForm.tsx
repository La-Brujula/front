import { brujulaUtils } from '@shared/utils/brujulaUtils';
import { useCallback, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import { PrivacyPolicy } from './privacyPolicy';
import { useAuth } from '@shared/context/auth';
import { AuthError } from 'firebase/auth';

export const SignUpForm = () => {
  const auth = useAuth();
  const brujula = brujulaUtils();
  const { register, handleSubmit, setValue, watch } = useForm<{
    email: string;
    password: string;
    persona: 'moral' | 'fisica';
    acceptPrivacy: boolean;
  }>();
  const tipoDePersona = watch('persona');
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const acceptedPrivacy = watch('acceptPrivacy');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const initializeUser = useCallback(async () => {
    try {
      await brujula.updateUserInfo({ type: tipoDePersona, created: true });
      navigate('basica');
    } catch (e) {
      setErrorMsg((e as any).toString());
    }
  }, [brujula, tipoDePersona, setErrorMsg, navigate]);

  const onSubmit = async (data: { email: string; password: string }) => {
    if (loading) return;
    if (!data.email || !data.password) return;
    setLoading(true);
    setErrorMsg('');
    if (
      await auth.register(data.email, data.password, onError, () =>
        initializeUser(),
      )
    ) {
      await initializeUser();
    }

    setLoading(false);
  };

  const onError = (err: unknown) => {
    setLoading(false);
    switch ((err as AuthError).code) {
      case 'auth/invalid-email':
        setErrorMsg('Ingresa un correo valido.');
        break;
      case 'auth/email-already-in-use':
        setErrorMsg('El correo ya esta registrado.');
        break;
      case 'auth/weak-password':
        setErrorMsg('La contraseña tiene que tener como mínimo 6 caracteres.');
        break;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (err) => {
        console.error(err);
        if (err.persona?.type == 'required') {
          setErrorMsg('No has especificado qué tipo de perfil quieres crear.');
        } else {
          setErrorMsg(Object.keys(err).join(' '));
        }
      })}
      className="flex flex-col gap-4"
    >
      <input
        type="hidden"
        {...register('persona')}
        required
      />
      <div className="flex flex-col md:items-center gap-8 justify-stretch mb-12">
        <div className="flex flex-col gap-2 items-start grow max-w-xs w-full">
          <label
            htmlFor="email"
            className="block"
          >
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
      <div className="flex flex-col gap-4">
        <label>{t('¿Eres persona física o persona moral?')}</label>
        <div
          className={[
            'flex flex-row gap-4 items-center justify-center mb-4',
          ].join(' ')}
        >
          <button
            className={[
              'outline outline-primary outline-1 px-8 py-4 rounded-lg cursor-pointer',
              tipoDePersona == 'fisica'
                ? '!bg-primary !text-white !outline-primary'
                : 'bg-transparent text-primary',
              errorMsg ==
                'No has especificado qué tipo de perfil quieres crear.' &&
                'outline-red-500 text-red-500',
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
                ? '!bg-primary !text-white !outline-primary'
                : 'bg-transparent text-primary',
              errorMsg ==
                'No has especificado qué tipo de perfil quieres crear.' &&
                'outline-red-500 text-red-500',
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
        <input
          type="hidden"
          required
          {...register('persona', { required: true })}
        />
      </div>
      {errorMsg === '' ? <></> : <p style={{ color: 'red' }}>{errorMsg}</p>}
      {acceptedPrivacy !== true && <PrivacyPolicy />}
      {!loading ? (
        <input
          type="submit"
          className="max-w-xs mx-auto bg-primary"
          value={t('Crear usuario')}
        />
      ) : (
        <LoadingSpinner />
      )}
      <p>
        {t('¿Ya tienes una cuenta?')}&nbsp;
        <NavLink
          to="/iniciar-sesion"
          className="mt-4"
        >
          {t('Inicia Sesión')}
        </NavLink>
      </p>
    </form>
  );
};