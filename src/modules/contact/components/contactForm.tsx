import { useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Path, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ErrorMessage } from '@/shared/components/errorMessage';
import { useCurrentProfile } from '@/shared/hooks/useCurrentProfile';
import { isApiError } from '@/shared/services/backendFetcher';

import Input from '@shared/components/input';
import { Container } from '@shared/layout/container';

import useContactForm, {
  ContactFormFields,
  TContactFormFields,
} from '../hook/useContactForm';

export function ContactForm() {
  const { t } = useTranslation('contact');
  const { data } = useCurrentProfile();
  const form = useForm<TContactFormFields>({
    resolver: zodResolver(ContactFormFields),
    defaultValues: {
      subject: '',
      name: data?.fullName || '',
      email: data?.primaryEmail || '',
      message: '',
    },
  });
  const { mutate, isPending, error, isSuccess } = useContactForm();

  const submitForm = useCallback(
    (values: TContactFormFields) =>
      mutate(values, {
        onSuccess: (data) => {
          for (const fieldName of Object.keys(data)) {
            form.setValue(fieldName as Path<TContactFormFields>, '');
          }
        },
        onError: (err) => {
          if (
            isApiError(err) &&
            err.errorCode == 'SE01' &&
            typeof err.message !== 'string'
          ) {
            for (const formError of err.message) {
              if (formError)
                form.setError(formError.path as Path<TContactFormFields>, {
                  type: 'custom',
                  message: formError.msg,
                });
            }
          }
        },
      }),
    [mutate]
  );

  return (
    <Container bg="light">
      <h2 className="mb-8 text-left">{t('Fomulario de contacto')}</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col gap-4"
        >
          <Input
            fieldName="subject"
            label={t('Asunto')}
            type="text"
            form={form}
            divClass="text-left text-primary"
            inputClass="border border-primary rounded-md
          text-black max-w-md bg-transparent"
            required={true}
          />
          {(data === undefined || data.fullName === '') && (
            <Input
              fieldName="name"
              label={t('Nombre')}
              type="text"
              form={form}
              autoComplete="name"
              divClass="text-left text-primary"
              inputClass="border border-primary rounded-md
          text-black max-w-md bg-transparent"
              required={true}
            />
          )}
          {(data === undefined || data.primaryEmail === '') && (
            <Input
              fieldName="email"
              label={t('Correo electrónico')}
              type="email"
              form={form}
              autoComplete="email"
              divClass="text-left text-primary"
              inputClass="border border-primary rounded-md
          text-black max-w-md bg-transparent"
              required={true}
            />
          )}
          <Input
            fieldName="message"
            label={t('Mensaje')}
            type="textArea"
            form={form}
            divClass="text-left text-primary"
            inputClass="border border-primary rounded-md
          text-black bg-transparent p-2
          transition-all"
            required={true}
          />
          {error !== null && (
            <ErrorMessage
              message={isApiError(error) ? error.errorCode : error.message}
            />
          )}
          {isSuccess && (
            <p className="bg-green-300 p-4">
              {t('Se mandó con éxito el mensaje, pronto estaremos en contacto')}
            </p>
          )}
          <Button
            type="submit"
            disabled={isPending || !form.formState.isValid}
            value={t('Enviar')}
            className="w-fit self-center bg-secondary"
          />
        </form>
      </Form>
    </Container>
  );
}
