import { useCallback, useState } from 'react';
import { Path, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import { PrivacyPolicy } from './privacyPolicy';
import { useAuth } from '@/shared/providers/authProvider';
import { Link, useNavigate } from '@tanstack/react-router';
import { signUpService } from '@/shared/services/authServices';
import useAuthFunction from '@/shared/hooks/useAuthFuncton';
import { ErrorMessage } from '@/shared/components/errorMessage';
import Input from '@/shared/components/input';
import { ButtonSelect } from '@/shared/components/buttonSelect';
import { isApiError } from '@/shared/services/backendFetcher';

type SignupForm = {
  email: string;
  password: string;
  persona: 'moral' | 'fisica';
  acceptPrivacy: boolean;
};

export const SignUpForm = () => {
  const { signup } = useAuth(['signup']);
  const { register, handleSubmit, watch, formState, setError } =
    useForm<SignupForm>();
  const { t } = useTranslation('auth');
  const acceptedPrivacy = watch('acceptPrivacy');
  const { isPending: loading, error, mutate } = useAuthFunction(signup);
  const navigate = useNavigate();

  const onSubmit = async (data: SignupForm) => {
    if (loading) return;
    if (!data.email || !data.password) return;
    mutate(
      { email: data.email, password: data.password, type: data.persona },
      {
        onError: (err) => {
          if (
            isApiError(err) &&
            err.errorCode === 'SE01' &&
            typeof err.message !== 'string'
          ) {
            for (const error of err.message) {
              setError(error.path as Path<SignupForm>, {
                type: 'custom',
                message: error.msg,
              });
            }
          }
        },
        onSuccess: () => {
          navigate({ to: '/profile/edit/basic' });
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <input
        type="hidden"
        {...register('persona')}
        required
      />
      <div className="flex flex-col md:items-center gap-8 justify-stretch mb-12">
        <Input
          label={t('Tu correo electrónico será tu nombre de usuario')}
          type="email"
          fieldName="email"
          placeholder={t('email')}
          autoComplete="email"
          register={register}
          required={true}
          divClass="flex flex-col gap-2 items-start grow max-w-xs w-full"
          error={formState.errors.email}
        />
        <Input
          label={t('Escribe una contraseña')}
          type="password"
          fieldName="password"
          placeholder={t('password')}
          autoComplete="password"
          register={register}
          required={true}
          divClass="flex flex-col gap-2 items-start grow max-w-xs w-full"
          error={formState.errors.password}
        />
      </div>
      <Input
        label={t('¿Eres persona física o persona moral?')}
        register={register}
        fieldName="persona"
        type="custom"
        component={ButtonSelect<SignupForm>}
        items={[
          { value: 'fisica', label: t('Persona física') },
          { value: 'moral', label: t('Persona moral') },
        ]}
        error={formState.errors.persona}
      />
      {error !== null && (
        <ErrorMessage
          message={isApiError(error) ? error.errorCode : error.message}
        />
      )}
      {acceptedPrivacy !== true && <PrivacyPolicy />}
      <input
        disabled={loading || !formState.isValid}
        type="submit"
        className="max-w-xs mx-auto bg-primary"
        value={t('Crear usuario')}
      />
      <p>
        {t('¿Ya tienes una cuenta?')}&nbsp;
        <Link
          to="/auth/login"
          className="mt-4"
        >
          {t('Inicia Sesión')}
        </Link>
      </p>
    </form>
  );
};
