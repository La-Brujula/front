import { useCallback } from 'react';

import {
  createLazyFileRoute,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import { Path, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { UniversidadesSelect } from '@/modules/auth/components/universidadesSelect';
import useUpdateProfile from '@/modules/me/hooks/updateProfileHook';
import { ErrorMessage } from '@/shared/components/errorMessage';
import Input from '@/shared/components/input';
import { useCurrentProfile } from '@/shared/hooks/useCurrentProfile';
import { useUpdateMe } from '@/shared/hooks/useUpdateMe';
import { isApiError } from '@/shared/services/backendFetcher';
import {
  ProfileUpdateRequest,
  TProfileUpdateForm,
  TProfileUpdateRequest,
} from '@/shared/types/user';

export const Route = createLazyFileRoute('/me/stand-out')({
  component: StandoutPage,
});

function StandoutPage() {
  const { history } = useRouter();
  const { t } = useTranslation('auth');
  const navigate = useNavigate();

  const { user, form, updateProfile, isPending, error } = useUpdateProfile();

  const onSubmit = async (data: TProfileUpdateRequest) => {
    const res = ProfileUpdateRequest.safeParse(data);
    if (!res.success) {
      for (const error of res.error.issues) {
        form.setError(error.path.join('.') as Path<TProfileUpdateForm>, {
          message: error.message,
        });
      }
      return;
    }
    updateProfile(res.data, {
      onSuccess: () => navigate({ to: '/me/contact', resetScroll: true }),
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex max-w-lg flex-col gap-8 text-left"
      >
        <p className="col-span-full">*{t('Information')}</p>
        <Input
          type="textArea"
          form={form}
          fieldName="headline"
          label={t('Agrega un lema o mensaje corto')}
          maxLength={60}
          inputClass="rounded-md bg-black bg-opacity-20 resize-none col-span-2 p-4 w-full"
          divClass="w-full"
        />
        <div className="flex flex-col gap-4">
          <h3 className="text-md text-primary">
            {t('Disponibilidad para viajar')}
          </h3>
          <Input
            divClass="grid grid-cols-subgrid col-span-2 items-center gap-x-4 w-full"
            label={t('¿Cuál es tu radio de trabajo?')}
            type="radioGroup"
            fieldName="workRadius"
            form={form}
            items={[
              { value: 'local', label: t('Local') },
              { value: 'state', label: t('Estatal') },
              { value: 'national', label: t('Nacional') },
              { value: 'international', label: t('Internacional') },
            ]}
          />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-base text-primary">
            {t('Servicios a distancia')}
          </h3>
          <Input
            label={t('¿Trabajas online?')}
            type="switch"
            fieldName="remote"
            form={form}
          />
        </div>
        {user?.type != 'moral' && (
          <div className="flex flex-col gap-4">
            <Input
              label={t('¿Te interesa ser becario o hacer servicio social?')}
              type="radioGroup"
              form={form}
              fieldName="probono"
              items={[
                { value: 'true', label: t('Sí') },
                { value: 'false', label: t('No') },
              ]}
            />
            <UniversidadesSelect
              label={t('¿Estudias o estudiaste en alguna de estas escuelas?')}
              form={form}
              fieldName="university"
            />
          </div>
        )}
        {error && (
          <ErrorMessage
            message={isApiError(error) ? error.errorCode : error.message}
          />
        )}
        <div className="flex flex-row gap-4 self-center">
          <Button
            className="button border border-primary bg-transparent font-bold text-black"
            onClick={() => history.back()}
          >
            {t('Regresar')}
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="border-none"
            value={t('Continuar')}
          />
        </div>
      </form>
    </Form>
  );
}

export default StandoutPage;
