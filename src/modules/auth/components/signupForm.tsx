import { Path, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { PrivacyPolicy } from './privacyPolicy';
import { useAuth } from '@/shared/providers/authProvider';
import { Link, useNavigate } from '@tanstack/react-router';
import useAuthFunction from '@/shared/hooks/useAuthFuncton';
import { ErrorMessage } from '@/shared/components/errorMessage';
import Input from '@/shared/components/input';
import { isApiError } from '@/shared/services/backendFetcher';
import { TFunction } from 'i18next';
import { useMemo } from 'react';

type SignupForm = {
  email: string;
  password: string;
  confirmPassword: string;
  persona: 'moral' | 'fisica';
  acceptPrivacy: boolean;
  referal?: string;
};

const personTypeOptionsGenerator = (t: TFunction) => [
  { value: 'fisica', label: t('Persona física') },
  { value: 'moral', label: t('Persona moral') },
];

export const SignUpForm = (props: { referal?: string }) => {
  const { signup } = useAuth(['signup']);
  const { register, handleSubmit, watch, formState, setError, setValue } =
    useForm<SignupForm>({
      defaultValues: {
        referal: props.referal,
        email: undefined,
        password: undefined,
        confirmPassword: undefined,
        persona: undefined,
      },
    });
  const { t } = useTranslation('auth');
  const acceptedPrivacy = watch('acceptPrivacy');
  const { isPending: loading, error, mutate } = useAuthFunction(signup);
  const navigate = useNavigate();

  const personTypeOptions = useMemo(() => personTypeOptionsGenerator(t), [t]);

  const onSubmit = async (data: SignupForm) => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', {
        type: 'custom',
        message: t('Las contraseñas no son iguales'),
      });
      return;
    }

    mutate(
      {
        email: data.email,
        password: data.password,
        type: data.persona,
        referal: data.referal,
      },
      {
        onError: (err) => {
          if (
            isApiError(err) &&
            err.errorCode === 'SE01' &&
            typeof err.message !== 'string'
          ) {
            for (const error of err.message) {
              if (error.path == 'type') {
                error.path = 'persona';
              }
              setError(error.path as Path<SignupForm>, {
                type: 'custom',
                message: error.msg,
              });
            }
          }
        },
        onSuccess: () => {
          navigate({ to: '/me/basic', resetScroll: true });
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
      <div className="flex flex-col md:items-center gap-8 justify-stretch">
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
          helperText={t('La contraseña debe tener al menos 8 caracteres')}
        />
        <Input
          label={t('Confirma tu contraseña')}
          type="password"
          fieldName="confirmPassword"
          placeholder={t('confirmPassword')}
          autoComplete="password"
          register={register}
          required={true}
          divClass="flex flex-col gap-2 items-start grow max-w-xs w-full"
          error={formState.errors.confirmPassword}
        />
        <Input
          label={t('¿Eres persona física o persona moral?')}
          divClass="text-center"
          register={register}
          fieldName="persona"
          type="radioGroup"
          required
          items={personTypeOptions}
          error={formState.errors.persona}
          setValue={setValue}
        />
      </div>
      {error !== null && (
        <ErrorMessage
          message={isApiError(error) ? error.errorCode : error.message}
        />
      )}
      {!!props.referal && (
        <p className="p-2 bg-primary bg-opacity-20 rounded-md">
          <Trans
            t={t}
            i18nKey={'Registering with'}
            values={{ referal: props.referal }}
          >
            Código de referencia:
            <br />
            <b></b>
          </Trans>
        </p>
      )}
      {acceptedPrivacy !== true && <PrivacyPolicy />}
      <input
        disabled={loading}
        type="submit"
        className="max-w-xs mx-auto bg-primary disabled:bg-black disabled:bg-opacity-20"
        value={t('Crear usuario')}
      />
      <p>
        {t('¿Ya tienes una cuenta?')}&nbsp;
        <Link
          to="/auth/login"
          className="mt-4"
          resetScroll
        >
          {t('Inicia Sesión')}
        </Link>
      </p>
    </form>
  );
};
