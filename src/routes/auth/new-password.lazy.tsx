import Input from '@/shared/components/input';
import useAuthFunction from '@/shared/hooks/useAuthFuncton';
import { useAuth } from '@/shared/providers/authProvider';
import { isApiError } from '@/shared/services/backendFetcher';
import ErrorMessage from '@shared/components/errorMessage';
import { Container } from '@shared/layout/container';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useCallback } from 'react';
import { Path, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/auth/new-password')({
  component: NewPasswordPage,
});

type PasswordChangeForm = {
  password: string;
  passwordConfirm: string;
};

function NewPasswordPage() {
  const { t } = useTranslation('auth');
  const { code, email } = Route.useSearch();
  const { register, handleSubmit, setError, formState } =
    useForm<PasswordChangeForm>();
  const { changeUserPassword, account } = useAuth([
    'changeUserPassword',
    'account',
  ]);
  const { isPending, mutate, error } = useAuthFunction(changeUserPassword);
  const navigate = useNavigate();

  const formHandler = useCallback(
    async (values: { password: string; passwordConfirm: string }) => {
      if (values.password != values.passwordConfirm) {
        return setError(
          'passwordConfirm',
          Error(t('Las contraseñas no coinciden')),
          { shouldFocus: true }
        );
      }
      mutate(
        { email, password: values.password, code },
        {
          onSuccess: () => navigate({ to: '/auth/login' }),
          onError: (error) => {
            if (
              isApiError(error) &&
              error.errorCode === 'SE01' &&
              !(typeof error.message === 'string')
            ) {
              for (const err of error.message) {
                setError(err.path as Path<PasswordChangeForm>, {
                  message: t(err.msg),
                });
              }
            }
          },
        }
      );
    },
    [changeUserPassword, account, code]
  );

  return (
    <Container>
      <h1 className="mb-8 text-secondary text-4xl">
        {t('Reiniciar contraseña')}
      </h1>
      <p className="mb-4">
        {t(
          'Escribe tu correo aquí y si está registrado te llegará un correo para reiniciar tu contraseña'
        )}
      </p>
      <form
        onSubmit={handleSubmit(formHandler)}
        className="flex flex-col flex-wrap gap-4
        justify-center text-left items-center max-w-md mx-auto"
      >
        <Input
          type="password"
          label={t('password')}
          fieldName="password"
          register={register}
          required={true}
          divClass="w-full"
          error={formState.errors.password}
        />
        <Input
          type="password"
          label={t('passwordConfirm')}
          fieldName="passwordConfirm"
          register={register}
          required={true}
          divClass="w-full"
          error={formState.errors.passwordConfirm}
        />
        {error && (
          <ErrorMessage
            message={isApiError(error) ? error.errorCode : error.message}
          />
        )}
        <input
          type="submit"
          disabled={isPending || !formState.isValid}
          value={t('Cambiar contraseña')}
          className="mx-auto w-fit"
        />
      </form>
    </Container>
  );
}

export default NewPasswordPage;
