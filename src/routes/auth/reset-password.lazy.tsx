import Input from '@/shared/components/input';
import useAuthFunction from '@/shared/hooks/useAuthFuncton';
import { useAuth } from '@/shared/providers/authProvider';
import { isApiError } from '@/shared/services/backendFetcher';
import ErrorMessage from '@shared/components/errorMessage';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import { Container } from '@shared/layout/container';
import { Link, createLazyFileRoute } from '@tanstack/react-router';
import { useCallback, useState } from 'react';
import { Path, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/auth/reset-password')({
  component: PasswordResetPage,
});

type PasswordResetForm = {
  email: string;
};

function PasswordResetPage() {
  const { t } = useTranslation('auth');
  const { register, handleSubmit, formState, setError } =
    useForm<PasswordResetForm>();
  const { sendPasswordReset } = useAuth(['sendPasswordReset']);
  const {
    isPending: loading,
    error,
    mutate,
  } = useAuthFunction(sendPasswordReset);
  const [emailSent, setEmailSent] = useState(false);

  const formHandler = useCallback(
    async (values: { email: string }) => {
      mutate(
        { email: values.email },
        {
          onSuccess: () => {
            setEmailSent(true);
          },
          onError: (error) => {
            if (
              isApiError(error) &&
              error.errorCode === 'SE01' &&
              !(typeof error.message === 'string')
            ) {
              for (const err of error.message) {
                console.log(err.path, err.msg);

                setError(err.path as Path<PasswordResetForm>, {
                  type: 'custom',
                  message: t(err.msg),
                });
              }
            }
          },
        }
      );
    },
    [sendPasswordReset]
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
      {!emailSent ? (
        <form
          onSubmit={handleSubmit(formHandler)}
          className="flex flex-col flex-wrap gap-4
          justify-center text-left items-center max-w-md mx-auto"
        >
          <Input
            type="email"
            label={t('email')}
            fieldName="email"
            register={register}
            required={true}
            divClass="w-full"
            error={formState.errors.email}
          />
          {error && (
            <ErrorMessage
              message={isApiError(error) ? error.errorCode : error.message}
            />
          )}
          <input
            type="submit"
            disabled={loading || !formState.isValid}
            value={t('Enviar Correo')}
            className="mx-auto w-fit"
          />
        </form>
      ) : (
        <>
          <p className="px-4 py-2 rounded-md bg-green-400 text-white font-bold">
            {t(
              'Se ha enviado el correo con el link para reiniciar tu contraseña'
            )}
          </p>
          <Link
            to="/auth/login"
            className="max-w-xs mx-auto bg-primary px-4 py-2 text-white
            rounded-md mt-4 block font-bold"
          >
            {t('Iniciar Sesión')}
          </Link>
        </>
      )}
    </Container>
  );
}

export default PasswordResetPage;
