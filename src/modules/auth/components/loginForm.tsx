import { useCallback } from 'react';
import { FieldValues, Path, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { useAuth } from '@/shared/providers/authProvider';
import { Link, useNavigate } from '@tanstack/react-router';
import Input from '@/shared/components/input';
import useAuthFunction from '@/shared/hooks/useAuthFuncton';
import { ErrorMessage } from '@/shared/components/errorMessage';
import { isApiError } from '@/shared/services/backendFetcher';

type LoginFormFields = {
  email: string;
  password: string;
};

export const LoginForm = (props: { redirectUrl?: string }) => {
  const { t } = useTranslation('auth');
  const { register, handleSubmit, formState, setError } =
    useForm<LoginFormFields>({
      defaultValues: {
        email: undefined,
        password: undefined,
      },
    });
  const navigate = useNavigate();
  const { login } = useAuth(['login']);
  const { isPending: loading, error, mutate } = useAuthFunction(login);

  const attemptLogin = useCallback(
    async (values: FieldValues) => {
      if (loading) return;
      if (!values.email || !values.password) return;
      mutate(
        { email: values.email, password: values.password },
        {
          onSuccess: (res) =>
            navigate({
              to: props.redirectUrl || '/profile/$userId',
              params: { userId: 'me' },
              resetScroll: true,
            }),
          onError: (error) => {
            if (
              isApiError(error) &&
              error.errorCode === 'SE01' &&
              !(typeof error.message === 'string')
            ) {
              for (const err of error.message) {
                setError(err.path as Path<LoginFormFields>, {
                  message: t(err.msg),
                });
              }
            }
          },
        }
      );
    },
    [mutate, navigate]
  );

  return (
    <>
      <form
        className="flex flex-col gap-4 lg:gap-8 justify-center items-center max-w-xs w-full mx-auto"
        onSubmit={handleSubmit(attemptLogin)}
      >
        <Input
          type="email"
          fieldName="email"
          label={t('email')}
          register={register}
          placeholder={t('ejemplo@labrujula.com')}
          autoComplete="email"
          required
          error={formState.errors.email}
        />
        <Input
          type="password"
          fieldName="password"
          label={t('password')}
          register={register}
          placeholder={t('password')}
          autoComplete="password"
          error={formState.errors.password}
          required
          minLength={8}
        />
        {error !== null && (
          <>
            <ErrorMessage
              message={isApiError(error) ? error.errorCode : error.message}
            />
            {isApiError(error) && error.errorCode == 'AE02' && (
              <div className="flex flex-col gap-2">
                <h3 className="text-red-500">
                  {t('¿Problemas iniciando sesión?')}
                </h3>
                <p>
                  <Trans
                    i18nKey="ResetPasswordReminder"
                    t={t}
                  >
                    No olvides{' '}
                    <Link
                      to="/auth/reset-password"
                      className="font-bold underline"
                    >
                      reiniciar tu contraseña
                    </Link>{' '}
                    si la última vez que lo hiciste fue antes del{' '}
                    <Link
                      to="/announcements"
                      className="font-bold underline"
                    >
                      8 de Mayo 2024
                    </Link>
                  </Trans>
                </p>
              </div>
            )}
          </>
        )}
        <input
          type="submit"
          disabled={loading || !formState.isValid}
          className="max-w-xs mx-auto bg-primary disabled:bg-black disabled:bg-opacity-20 disabled:cursor-default"
          onClick={attemptLogin}
          value={t('Inicia sesión')}
        />
      </form>
      <div className="flex flex-col gap-2 mt-4 text-primary">
        <Link
          to="/auth/signup"
          className="max-w-xs mx-auto mt-2 bg-secondary px-4 py-2 text-white rounded-md"
          resetScroll
        >
          {t('createUser')}
        </Link>
        <Link
          to="/auth/reset-password"
          resetScroll
        >
          {t('forgotPassword')}
        </Link>
      </div>
    </>
  );
};
