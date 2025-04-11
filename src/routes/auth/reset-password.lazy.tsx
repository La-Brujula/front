import { useCallback, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Link, createLazyFileRoute } from '@tanstack/react-router';
import { Path, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import Input from '@/shared/components/input';
import useAuthFunction from '@/shared/hooks/useAuthFuncton';
import { useAuth } from '@/shared/providers/authProvider';
import { isApiError } from '@/shared/services/backendFetcher';

import ErrorMessage from '@shared/components/errorMessage';
import { Container } from '@shared/layout/container';

export const Route = createLazyFileRoute('/auth/reset-password')({
  component: PasswordResetPage,
});

const PasswordResetForm = z.object({
  email: z.string(),
});

type TPasswordResetForm = z.infer<typeof PasswordResetForm>;

function PasswordResetPage() {
  const { t } = useTranslation('auth');
  const form = useForm<TPasswordResetForm>({
    resolver: zodResolver(PasswordResetForm),
  });
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
                form.setError(err.path as Path<TPasswordResetForm>, {
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
      <h1 className="mb-8 text-4xl text-secondary">
        {t('Reiniciar contraseña')}
      </h1>
      <p className="mb-4">
        {t(
          'Escribe tu correo aquí y si está registrado te llegará un correo para reiniciar tu contraseña'
        )}
      </p>
      <p className="mb-4">
        <Trans
          t={t}
          i18nKey="porCuestiones"
        >
          Por cuestiones de seguridad sólo podrás pedir <b>3 veces el código</b>{' '}
          antes de tener que contactar a nuestro equipo
        </Trans>
      </p>
      <p className="mb-4">
        <Trans
          t={t}
          i18nKey="cadaCodigo"
        >
          Cada código tiene una validez de 45 minutos. Te recomendamos{' '}
          <b>esperar al menos 30</b> antes de pedir otro porque hacerlo invalida
          automáticamente el anterior
        </Trans>
      </p>
      {!emailSent ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(formHandler)}
            className="mx-auto flex max-w-md flex-col flex-wrap items-center justify-center gap-4 text-left"
          >
            <Input
              type="email"
              label={t('email')}
              fieldName="email"
              form={form}
              required={true}
              divClass="w-full"
            />
            {error && (
              <ErrorMessage
                message={isApiError(error) ? error.errorCode : error.message}
              />
            )}
            <Button
              type="submit"
              disabled={loading || !form.formState.isValid}
              value={t('Enviar Correo')}
              className="mx-auto w-fit"
            />
          </form>
        </Form>
      ) : (
        <>
          <p className="rounded-md bg-secondary px-4 py-2 font-bold text-white">
            {t(
              'Se ha enviado el correo con el link para reiniciar tu contraseña'
            )}
          </p>
          <Link
            to="/auth/login"
            className="mx-auto mt-4 block max-w-xs rounded-md bg-primary px-4 py-2 font-bold text-white"
          >
            {t('Iniciar Sesión')}
          </Link>
        </>
      )}
    </Container>
  );
}

export default PasswordResetPage;
