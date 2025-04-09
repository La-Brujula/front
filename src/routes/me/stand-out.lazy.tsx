import { UniversidadesSelect } from '@/modules/auth/components/universidadesSelect';
import useUpdateProfile from '@/modules/me/hooks/updateProfileHook';
import { ErrorMessage } from '@/shared/components/errorMessage';
import Input from '@/shared/components/input';
import { isApiError } from '@/shared/services/backendFetcher';
import { TProfileUpdateForm, TProfileUpdateRequest } from '@/shared/types/user';
import {
  createLazyFileRoute,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/me/stand-out')({
  component: StandoutPage,
});

function StandoutPage() {
  const { history } = useRouter();
  const { t } = useTranslation('auth');
  const navigate = useNavigate();

  const {
    user,
    register,
    handleSubmit,
    formState,
    updateProfile,
    isPending,
    error,
    setValue,
  } = useUpdateProfile();

  const onSubmit = async (data: TProfileUpdateForm) => {
    updateProfile(data, {
      onSuccess: () => navigate({ to: '/me/contact', resetScroll: true }),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col text-left gap-8 mx-auto max-w-lg"
    >
      <p className="col-span-full">*{t('Information')}</p>
      <Input
        type="textArea"
        register={register}
        fieldName="headline"
        label={t('Agrega un lema o mensaje corto')}
        rows={3}
        maxLength={60}
        inputClass="rounded-md bg-black bg-opacity-20 resize-none col-span-2 p-4 w-full"
        divClass="w-full"
        error={formState.errors.headline}
      />
      <div className="flex flex-col gap-4">
        <h3 className="text-primary text-md">
          {t('Disponibilidad para viajar')}
        </h3>
        <Input
          divClass="grid grid-cols-subgrid col-span-2 items-center gap-x-4 w-full"
          label={t('¿Cuál es tu radio de trabajo?')}
          type="radioGroup"
          fieldName="workRadius"
          register={register}
          items={[
            { value: 'local', label: t('Local') },
            { value: 'state', label: t('Estatal') },
            { value: 'national', label: t('Nacional') },
            { value: 'international', label: t('Internacional') },
          ]}
          error={formState.errors.workRadius}
          setValue={setValue}
        />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-primary text-base">{t('Servicios a distancia')}</h3>
        <Input
          label={t('¿Trabajas online?')}
          type="radioGroup"
          fieldName="remote"
          register={register}
          items={[
            { value: 'true', label: t('Sí') },
            { value: 'false', label: t('No') },
          ]}
          error={formState.errors.remote}
          setValue={setValue}
        />
      </div>
      {user?.type != 'moral' && (
        <div className="flex flex-col gap-4">
          <Input
            label={t('¿Te interesa ser becario o hacer servicio social?')}
            type="radioGroup"
            register={register}
            fieldName="probono"
            items={[
              { value: 'true', label: t('Sí') },
              { value: 'false', label: t('No') },
            ]}
            error={formState.errors.probono}
            setValue={setValue}
          />
          <Input
            label={t('¿Estudias o estudiaste en alguna de estas escuelas?')}
            type="custom"
            register={register}
            fieldName="university"
            component={UniversidadesSelect<TProfileUpdateForm>}
            error={formState.errors.probono}
          />
        </div>
      )}
      {error && (
        <ErrorMessage
          message={isApiError(error) ? error.errorCode : error.message}
        />
      )}
      <div className="flex flex-row gap-4 self-center">
        <div
          className="button font-bold bg-transparent border border-primary text-black"
          onClick={() => history.back()}
        >
          {t('Regresar')}
        </div>
        <input
          type="submit"
          disabled={isPending}
          className="border-none"
          value={t('Continuar')}
        />
      </div>
    </form>
  );
}

export default StandoutPage;
