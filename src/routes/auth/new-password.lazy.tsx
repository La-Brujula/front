import { useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { Path, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import Input from '@/shared/components/input';
import useAuthFunction from '@/shared/hooks/useAuthFuncton';
import { useAuth } from '@/shared/providers/authProvider';
import { isApiError } from '@/shared/services/backendFetcher';

import ErrorMessage from '@shared/components/errorMessage';
import { Container } from '@shared/layout/container';

export const Route = createLazyFileRoute('/auth/new-password')({
  component: NewPasswordPage,
});

const PasswordChangeForm = z.object({
  password: z.string(),
  passwordConfirm: z.string(),
});

type TPasswordChangeForm = z.infer<typeof PasswordChangeForm>;

function NewPasswordPage() {
  const { t } = useTranslation('auth');
  const { code, email } = Route.useSearch();
  const form = useForm<TPasswordChangeForm>({
    resolver: zodResolver(PasswordChangeForm),
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  });
  const { changeUserPassword } = useAuth(['changeUserPassword']);
  const { isPending, mutate, error } = useAuthFunction(changeUserPassword);
  const navigate = useNavigate();

  const formHandler = useCallback(
    (values: { password: string; passwordConfirm: string }) => {
      if (values.password != values.passwordConfirm) {
        return form.setError(
          'passwordConfirm',
          Error(t('Las contraseñas no coinciden')),
          { shouldFocus: true }
        );
      }
      mutate(
        { email, password: values.password, code },
        {
          onSuccess: () => {
            navigate({
              to: '/',
              resetScroll: true,
            });
          },
          onError: (error) => {
            if (
              isApiError(error) &&
              error.errorCode === 'SE01' &&
              !(typeof error.message === 'string')
            ) {
              for (const err of error.message) {
                form.setError(err.path as Path<TPasswordChangeForm>, {
                  message: t(err.msg),
                });
              }
            }
          },
        }
      );
    },
    [email, code, form.setError, mutate, navigate, t]
  );

  return (
    <Container>
      <h1 className="mb-8 text-4xl text-secondary">
        {t('Cambio de contraseña')}
      </h1>
      <p className="mb-4">
        {t('A continuación ingresa la nueva contraseña que quieres usar')}
      </p>
      <form
        onSubmit={form.handleSubmit(formHandler)}
        className="mx-auto flex max-w-md flex-col flex-wrap items-center justify-center gap-4 text-left"
      >
        <Input
          type="password"
          label={t('password')}
          fieldName="password"
          form={form}
          required={true}
          divClass="w-full"
        />
        <Input
          type="password"
          label={t('passwordConfirm')}
          fieldName="passwordConfirm"
          form={form}
          required={true}
          divClass="w-full"
        />
        {error && (
          <ErrorMessage
            message={isApiError(error) ? error.errorCode : error.message}
          />
        )}
        <input
          type="submit"
          disabled={isPending || !form.formState.isValid}
          value={t('Cambiar contraseña')}
          className="mx-auto w-fit"
        />
      </form>
    </Container>
  );
}

export default NewPasswordPage;
