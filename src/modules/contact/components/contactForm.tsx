import Input from '@shared/components/input';
import { Container } from '@shared/layout/container';
import { Path, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import useContactForm, { ContactFormFields } from '../hook/useContactForm';
import { useCallback } from 'react';
import { ErrorMessage } from '@/shared/components/errorMessage';
import { isApiError } from '@/shared/services/backendFetcher';
import { useCurrentProfile } from '@/shared/hooks/useCurrentProfile';

export function ContactForm() {
  const { t } = useTranslation('contact');
  const { data } = useCurrentProfile();
  const { register, handleSubmit, formState, setError, setValue } =
    useForm<ContactFormFields>({
      defaultValues: {
        subject: '',
        name: data?.fullName || '',
        email: data?.primaryEmail || '',
        message: '',
      },
    });
  const { mutate, isPending, error, isSuccess } = useContactForm();

  const submitForm = useCallback(
    (values: ContactFormFields) =>
      mutate(values, {
        onSuccess: (data) => {
          for (const fieldName of Object.keys(data)) {
            setValue(fieldName as Path<ContactFormFields>, '');
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
                setError(formError.path as Path<ContactFormFields>, {
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
      <h2 className="text-left mb-8">{t('Fomulario de contacto')}</h2>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col gap-4"
      >
        <Input
          fieldName="subject"
          label={t('Asunto')}
          type="text"
          register={register}
          divClass="text-left text-primary"
          inputClass="border border-primary rounded-md
          text-black max-w-md bg-transparent"
          required={true}
          error={formState.errors.subject}
        />
        {(data === undefined || data.fullName === '') && (
          <Input
            fieldName="name"
            label={t('Nombre')}
            type="text"
            register={register}
            autoComplete="name"
            divClass="text-left text-primary"
            inputClass="border border-primary rounded-md
          text-black max-w-md bg-transparent"
            error={formState.errors.name}
            required={true}
          />
        )}
        {(data === undefined || data.primaryEmail === '') && (
          <Input
            fieldName="email"
            label={t('Correo electrónico')}
            type="email"
            register={register}
            autoComplete="email"
            divClass="text-left text-primary"
            inputClass="border border-primary rounded-md
          text-black max-w-md bg-transparent"
            error={formState.errors.email}
            required={true}
          />
        )}
        <Input
          fieldName="message"
          label={t('Mensaje')}
          type="textArea"
          register={register}
          divClass="text-left text-primary"
          inputClass="border border-primary rounded-md
          text-black bg-transparent p-2
          transition-all"
          required={true}
          rows={5}
          error={formState.errors.message}
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
        <input
          type="submit"
          disabled={isPending || !formState.isValid}
          value={t('Enviar')}
          className="bg-secondary w-fit self-center"
        />
      </form>
    </Container>
  );
}
