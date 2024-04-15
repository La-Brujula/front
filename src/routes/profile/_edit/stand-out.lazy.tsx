import { UniversidadesSelect } from '@/modules/auth/components/universidadesSelect';
import { ErrorMessage } from '@/shared/components/errorMessage';
import Input from '@/shared/components/input';
import { useCurrentProfile } from '@/shared/hooks/useCurrentProfile';
import { useUpdateMe } from '@/shared/hooks/useUpdateMe';
import { IUpdateBackendProfile } from '@/shared/types/user';
import { ButtonSelect } from '@shared/components/buttonSelect';
import { LoadingSpinner } from '@shared/components/loadingSpinner';
import {
  createLazyFileRoute,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/profile/_edit/stand-out')({
  component: StandoutPage,
});

function StandoutPage() {
  const { history } = useRouter();
  const { t } = useTranslation('auth');
  const navigate = useNavigate();

  const { data: user, isLoading: loading } = useCurrentProfile();

  const {
    register: formRegister,
    handleSubmit,
    formState,
  } = useForm<IUpdateBackendProfile>({
    defaultValues: {
      ...user,
      remote:
        user?.remote === undefined
          ? undefined
          : user?.remote === true
            ? 'true'
            : 'false',
      probono:
        user?.probono === undefined
          ? undefined
          : user?.probono === true
            ? 'true'
            : 'false',
    },
  });

  const register = useCallback(formRegister, [formRegister]);

  const { mutate, isPending, error: mutateError } = useUpdateMe();

  const onSubmit = async (data: IUpdateBackendProfile) => {
    mutate(data, {
      onSuccess: () => navigate({ to: '/profile/edit/contact' }),
    });
  };

  return loading ? (
    <LoadingSpinner />
  ) : (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col text-left gap-8 mx-auto max-w-lg"
    >
      <p className="col-span-full">*{t('Information')}</p>
      <Input
        label={t('Agrega un lema o mensaje corto')}
        type="textArea"
        fieldName="headline"
        rows={3}
        maxLength={60}
        inputClass="rounded-md bg-black bg-opacity-20 resize-none col-span-2 p-4 w-full"
        register={register}
        divClass="w-full"
      />
      <div className="flex flex-col gap-4">
        <h3 className="text-primary text-md">
          {t('Disponibilidad para viajar')}
        </h3>
        <Input
          divClass="grid grid-cols-subgrid col-span-2 items-center gap-x-4 w-full"
          label={t('¿Cuál es tu radio de trabajo?')}
          type="select"
          fieldName="workRadius"
          register={register}
          items={[
            ['local', t('Local')],
            ['state', t('Estatal')],
            ['national', t('Nacional')],
            ['international', t('Internacional')],
          ].map(([key, label]) => ({ key, label }))}
        />
      </div>
      {user?.type != 'moral' && (
        <div className="flex flex-col gap-4">
          <Input
            label={t('¿Te interesa ser becario o hacer servicio social?')}
            type="custom"
            register={register}
            fieldName="probono"
            component={ButtonSelect<IUpdateBackendProfile>}
            buttonDivClass="!justify-start"
            items={[
              { value: 'true', label: t('Sí') },
              { value: 'false', label: t('No') },
            ]}
          />
          <Input
            label={t('¿Estudias o estudiaste en alguna de estas escuelas?')}
            type="custom"
            register={register}
            fieldName="university"
            component={UniversidadesSelect<IUpdateBackendProfile>}
          />
        </div>
      )}
      <div className="flex flex-col gap-4">
        <h3 className="text-primary text-base">{t('Servicios a distancia')}</h3>
        <Input
          label={t('¿Trabajas online?')}
          type="custom"
          fieldName="remote"
          register={register}
          component={ButtonSelect<IUpdateBackendProfile>}
          buttonDivClass="!justify-start"
          items={[
            { value: 'true', label: t('Sí') },
            { value: 'false', label: t('No') },
          ]}
        />
      </div>
      {mutateError && <ErrorMessage message={mutateError.message} />}
      <div className="flex flex-row gap-4 self-center">
        <div
          className="button font-bold bg-transparent border border-primary text-black"
          onClick={history.back}
        >
          {t('Regresar')}
        </div>
        <input
          type="submit"
          disabled={isPending || !formState.isValid}
          className="border-none"
          value={t('Continuar')}
        />
      </div>
    </form>
  );
}

export default StandoutPage;
