import { useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from '@tanstack/react-router';
import { TFunction } from 'i18next';
import { Path, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ErrorMessage } from '@/shared/components/errorMessage';
import Input from '@/shared/components/input';
import useAuthFunction from '@/shared/hooks/useAuthFuncton';
import { useAuth } from '@/shared/providers/authProvider';
import { isApiError } from '@/shared/services/backendFetcher';

import { PrivacyPolicy } from './privacyPolicy';

const SignupFormZod = z.object({
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
  persona: z.enum(['fisica', 'moral']),
  acceptPrivacy: z.boolean(),
  referal: z.optional(z.string()),
});

type TSignupFormZod = z.infer<typeof SignupFormZod>;

const personTypeOptionsGenerator = (t: TFunction) => [
  { value: 'fisica', label: t('Persona física') },
  { value: 'moral', label: t('Persona moral') },
];

export const SignUpForm = (props: { referal?: string }) => {
  const { signup } = useAuth(['signup']);
  const form = useForm<TSignupFormZod>({
    resolver: zodResolver(SignupFormZod),
    defaultValues: {
      referal: props.referal,
      email: '',
      password: '',
      confirmPassword: '',
      persona: 'fisica',
      acceptPrivacy: false,
    },
  });
  const { t } = useTranslation('auth');
  const acceptedPrivacy = form.watch('acceptPrivacy');
  const { isPending: loading, error, mutate } = useAuthFunction(signup);
  const navigate = useNavigate();

  const personTypeOptions = useMemo(() => personTypeOptionsGenerator(t), [t]);

  const onSubmit = async (data: TSignupFormZod) => {
    if (data.password !== data.confirmPassword) {
      form.setError('confirmPassword', {
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
              form.setError(error.path as Path<TSignupFormZod>, {
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col justify-stretch gap-8 md:items-center">
          <Input
            label={t('Tu correo electrónico será tu nombre de usuario')}
            type="email"
            fieldName="email"
            placeholder={t('email')}
            autoComplete="email"
            form={form}
            required={true}
            divClass="flex flex-col gap-2 items-start grow max-w-xs w-full"
          />
          <Input
            label={t('Escribe una contraseña')}
            type="password"
            fieldName="password"
            placeholder={t('password')}
            autoComplete="password"
            form={form}
            required={true}
            divClass="flex flex-col gap-2 items-start grow max-w-xs w-full"
            helperText={t('La contraseña debe tener al menos 8 caracteres')}
          />
          <Input
            label={t('Confirma tu contraseña')}
            type="password"
            fieldName="confirmPassword"
            placeholder={t('confirmPassword')}
            autoComplete="password"
            form={form}
            required={true}
            divClass="flex flex-col gap-2 items-start grow max-w-xs w-full"
          />
          <Input
            label={t('¿Eres persona física o persona moral?')}
            divClass="text-center"
            form={form}
            fieldName="persona"
            type="radioGroup"
            required
            items={personTypeOptions}
          />
        </div>
        {error !== null && (
          <ErrorMessage
            message={isApiError(error) ? error.errorCode : error.message}
          />
        )}
        {!!props.referal && (
          <p className="rounded-md bg-primary bg-opacity-20 p-2">
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
        <Button
          type="submit"
          disabled={loading}
          className="mx-auto max-w-xs bg-primary disabled:bg-black disabled:bg-opacity-20"
        >
          {t('Crear usuario')}
        </Button>
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
    </Form>
  );
};
