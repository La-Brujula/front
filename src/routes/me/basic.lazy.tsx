import { useCallback, useMemo } from 'react';

import {
  createLazyFileRoute,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useUpdateProfile from '@/modules/me/hooks/updateProfileHook';
import CountrySelect from '@/shared/components/countrySelect';
import Input from '@/shared/components/input';
import genders from '@/shared/constants/genders';
import { ApiError, isApiError } from '@/shared/services/backendFetcher';
import { TProfileUpdateRequest } from '@/shared/types/user';

import ErrorMessage from '@shared/components/errorMessage';
import estados from '@shared/constants/estados.json';

export const Route = createLazyFileRoute('/me/basic')({
  component: BasicInfo,
});

function BasicInfo() {
  const navigate = useNavigate();
  const { history } = useRouter();

  const { t } = useTranslation(['auth', 'genders']);

  const { createOnSubmit, form, isPending, user, error } = useUpdateProfile();

  const country = form.watch('country');

  const onError = useCallback(
    (error: ApiError | AxiosError | Error) => {
      if (
        isApiError(error) &&
        error.errorCode === 'SE01' &&
        !(typeof error.message === 'string')
      ) {
        for (const err of error.message) {
          form.setError(err.path as Path<TProfileUpdateRequest>, {
            message: t(err.msg),
          });
        }
      }
    },
    [form.setError, t]
  );

  const onSuccess = useCallback(
    () => navigate({ to: '/me/areas', resetScroll: true }),
    []
  );

  const onSubmit = useMemo(
    () => createOnSubmit(onSuccess, onError),
    [onSuccess, onError]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-lg flex-col gap-8 text-left"
      >
        <p className="text-sm">*{t('información obligatoria')}</p>
        <div className="flex w-full flex-col gap-4">
          <h2 className="text-primary">{t('Información básica')}</h2>
          {user?.type == 'moral' ? (
            <Input
              label={t('Razón Social')}
              type="text"
              autoComplete=""
              form={form}
              fieldName="firstName"
              divClass=""
              required={true}
            />
          ) : (
            <>
              <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                <Input
                  label={t('Nombre (s)')}
                  type="text"
                  autoComplete="given-name"
                  form={form}
                  fieldName="firstName"
                  divClass=""
                  required={true}
                />
                <Input
                  label={t('Apellido (s)')}
                  type="text"
                  autoComplete="family-name"
                  form={form}
                  fieldName="lastName"
                  required={true}
                />
              </div>
              <Input
                label={t('Nombre con el que quieres aparecer')}
                type="text"
                autoComplete={undefined}
                form={form}
                fieldName="nickName"
                divClass=""
                required={false}
              />
              <Input
                label={t('Género')}
                type="select"
                form={form}
                fieldName="gender"
                divClass=""
                required={true}
                items={genders.map((gender) => ({
                  value: gender,
                  label: t(gender, { ns: 'genders' }),
                }))}
              />
              <Input
                label={t('Fecha de nacimiento')}
                type="date"
                form={form}
                fieldName="birthday"
                autoComplete="birthday"
                divClass=""
                required={false}
              />
              <p className="-mt-2 text-xs">
                {t('Este dato solamente es para uso interno')}
              </p>
            </>
          )}
        </div>
        <div className="flex flex-col gap-4 text-left">
          <h2 className="text-primary">{t('Ubicación')}</h2>
          <CountrySelect
            form={form}
            fieldName="country"
            hasLabel={true}
          />
          {country !== undefined && Object.keys(estados).includes(country) ? (
            <Input
              key={country}
              label={t('Estado')}
              type="select"
              form={form}
              fieldName="state"
              divClass=""
              required={true}
              items={estados[country as 'MX' | 'CO'].flatMap((estado) => ({
                value: estado,
                label: estado,
              }))}
            />
          ) : (
            <Input
              label={t('Estado')}
              type="text"
              form={form}
              fieldName="state"
              autoComplete="state"
              divClass=""
              required={true}
            />
          )}
          <Input
            label={t('Ciudad')}
            type="text"
            form={form}
            fieldName="city"
            autoComplete="city"
            divClass=""
            required={true}
          />
          <Input
            divClass=""
            label={t('CP')}
            type="text"
            fieldName="postalCode"
            autoComplete="postal-code"
            form={form}
          />
        </div>
        {error !== null && (
          <ErrorMessage
            message={isApiError(error) ? error.errorCode : error.message}
          />
        )}
        {!form.formState.isValid && (
          <p className="w-full text-center">
            {t('Llena todos los campos marcados con "*"')}
          </p>
        )}
        <div className="flex flex-row justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => history.back()}
          >
            {t('Regresar')}
          </Button>
          <Button
            type="submit"
            className="border-none"
            disabled={isPending || !form.formState.isValid}
          >
            {t('Continuar')}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default BasicInfo;
