import { useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from '@tanstack/react-router';
import { FieldValues, Path, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ErrorMessage } from '@/shared/components/errorMessage';
import Input from '@/shared/components/input';
import useAuthFunction from '@/shared/hooks/useAuthFuncton';
import { useAuth } from '@/shared/providers/authProvider';
import { isApiError } from '@/shared/services/backendFetcher';

const LoginFormFields = z.object({
  email: z.string().email(),
  password: z.string(),
});

type TLoginForm = z.infer<typeof LoginFormFields>;

export const LoginForm = (props: { redirectUrl?: string }) => {
  const { t } = useTranslation('auth');
  const form = useForm<TLoginForm>({
    resolver: zodResolver(LoginFormFields),
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
                form.setError(err.path as Path<TLoginForm>, {
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
    <Form {...form}>
      <form
        className="mx-auto flex w-full max-w-xs flex-col items-center justify-center gap-4 lg:gap-8"
        onSubmit={form.handleSubmit(attemptLogin)}
      >
        <Input
          type="email"
          fieldName="email"
          label={t('email')}
          form={form}
          placeholder={t('ejemplo@labrujula.com')}
          autoComplete="email"
          required
        />
        <Input
          type="password"
          fieldName="password"
          label={t('password')}
          form={form}
          placeholder={t('password')}
          autoComplete="password"
          required
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
        <Button
          type="submit"
          disabled={loading || !form.formState.isValid}
          className="mx-auto max-w-xs bg-primary disabled:cursor-default disabled:bg-black disabled:bg-opacity-20"
          onClick={attemptLogin}
        >
          {t('Inicia sesión')}
        </Button>
      </form>
      <div className="mt-4 flex flex-col gap-2 text-primary">
        <Link
          to="/auth/signup"
          className="mx-auto mt-2 max-w-xs rounded-md bg-secondary px-4 py-2 text-white"
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
    </Form>
  );
};
