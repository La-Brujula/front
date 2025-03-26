import {
  IAccountDTO,
  UpdateAccountRequest,
  UpdateAccountRequestParams,
} from '@/shared/types/account';
import React, { useCallback, useMemo } from 'react';
import { useUpdateAccount } from '../hooks/updateAccountHook';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@/shared/components/errorMessage';
import { useTranslation } from 'react-i18next';
import Input from '@/shared/components/input';

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

  const { register, handleSubmit, setValue, formState, watch } =
    useForm<UpdateAccountRequest>({
      defaultValues,
    });

  const { jobNotifications, contactMethod } = watch();

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <Input
          type="checkbox"
          register={register}
          fieldName="jobNotifications"
          label={t('Notificaciones de bolsa de trabajo')}
          value="true"
          inputClass="!size-6"
          checked={jobNotifications}
          divClass="!flex-row gap-2"
          error={formState.errors.jobNotifications}
        />
        {jobNotifications && (
          <Input
            type="select"
            register={register}
            fieldName="contactMethod"
            label={t('Forma de contacto')}
            items={[
              { label: t('Whatsapp'), key: 'whatsapp' },
              { label: t('Correo electrónico'), key: 'email' },
            ]}
            error={formState.errors.contactMethod}
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
      <input
        type="submit"
        value={t('Guardar')}
        disabled={isPending}
        className="w-fit self-center"
      />
      {isSuccess && !formState.isDirty && <p>{t('Ajustes actualizados')}</p>}
      {updateError && <ErrorMessage message={updateError.message} />}
    </form>
  );
}
