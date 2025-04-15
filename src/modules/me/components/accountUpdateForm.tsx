import { useCallback, useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ErrorMessage } from '@/shared/components/errorMessage';
import Input from '@/shared/components/input';
import {
  IAccountDTO,
  UpdateAccountRequest,
  UpdateAccountRequestParams,
} from '@/shared/types/account';

import { useUpdateAccount } from '../hooks/updateAccountHook';

export default function AccountUpdateForm({
  account,
}: {
  account?: IAccountDTO;
}) {
  const { t } = useTranslation('auth');

  const {
    mutate,
    isPending,
    error: updateError,
    isSuccess,
  } = useUpdateAccount();

  const defaultValues = useMemo(
    () => ({
      contactMethod: account?.contactMethod,
      jobNotifications: account?.jobNotifications ?? false,
    }),
    [account]
  );

  const form = useForm<UpdateAccountRequest>({
    resolver: zodResolver(UpdateAccountRequestParams),
    defaultValues,
  });

  const { jobNotifications, contactMethod } = form.watch();

  const onSubmit = useCallback(
    (values: UpdateAccountRequest) => {
      const validation = UpdateAccountRequestParams.safeParse(values);
      if (validation.success) {
        mutate(values);
      }
    },
    [mutate]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <Input
            type="switch"
            form={form}
            fieldName="jobNotifications"
            label={t('Notificaciones de bolsa de trabajo')}
            inputClass="!size-6"
            divClass="!flex-row gap-2"
          />
          {jobNotifications && (
            <Input
              type="select"
              form={form}
              fieldName="contactMethod"
              label={t('Forma de contacto')}
              items={[
                { label: t('Whatsapp'), value: 'whatsapp' },
                { label: t('Correo electrónico'), value: 'email' },
              ]}
            />
          )}
          {contactMethod == 'whatsapp' ? (
            <p>
              {t(
                'Para las comunicaciones por whatsapp utilizamos la información de contacto de tu perfil, por favor asegúrate que está actualizada'
              )}
            </p>
          ) : (
            <></>
          )}
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className="w-fit self-center"
        >
          {t('Guardar')}
        </Button>
        {isSuccess && !form.formState.isDirty && (
          <p>{t('Ajustes actualizados')}</p>
        )}
        {updateError && <ErrorMessage message={updateError.message} />}
      </form>
    </Form>
  );
}
