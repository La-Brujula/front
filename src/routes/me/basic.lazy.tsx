import ErrorMessage from '@shared/components/errorMessage';
import genders from '@shared/constants/genders.json';
import { Path, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IUpdateBackendProfile } from '@/shared/types/user';
import Input from '@/shared/components/input';
import CountrySelect from '@/shared/components/countrySelect';
import {
  createLazyFileRoute,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import { useCurrentProfile } from '@/shared/hooks/useCurrentProfile';
import { useUpdateMe } from '@/shared/hooks/useUpdateMe';
import DataSuspense from '@/shared/components/dataSuspense';
import { useCallback } from 'react';
import { isApiError } from '@/shared/services/backendFetcher';
import estados from '@shared/constants/estados.json';

export const Route = createLazyFileRoute('/me/basic')({
  component: BasicInfo,
});

function BasicInfo() {
  const navigate = useNavigate();
  const { history } = useRouter();

  const { t } = useTranslation(['auth', 'genders']);

  const { mutate, isPending, error: mutateError } = useUpdateMe();
  const { data: user, isLoading: loading, error } = useCurrentProfile();

  const { register, handleSubmit, formState, setError, watch, setValue } =
    useForm<IUpdateBackendProfile>({
      defaultValues: {
        country: 'MX',
        ...user,
        gender: user?.type === 'moral' ? 'other' : user?.gender || 'other',
        probono:
          user?.probono !== undefined
            ? user.probono === true
              ? 'true'
              : 'false'
            : undefined,
        birthday:
          user?.birthday !== undefined ? user.birthday?.slice(0, 10) : '',
      },
    });

  const country = watch('country');

  const onSubmit = useCallback(
    async (data: IUpdateBackendProfile) => {
      mutate(data, {
        onSuccess: () => navigate({ to: '/me/areas', resetScroll: true }),
        onError: (error) => {
          if (
            isApiError(error) &&
            error.errorCode === 'SE01' &&
            !(typeof error.message === 'string')
          ) {
            for (const err of error.message) {
              setError(err.path as Path<IUpdateBackendProfile>, {
                message: t(err.msg),
              });
            }
          }
        },
      });
    },
    [navigate, mutate]
  );

  return (
    <DataSuspense
      loading={loading}
      error={error}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col text-left gap-8 mx-auto max-w-lg w-full"
      >
        <p className="text-sm">*{t('información obligatoria')}</p>
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-primary">{t('Información básica')}</h2>
          {user?.type == 'moral' ? (
            <>
              <Input
                label={t('Razón Social')}
                type="text"
                autoComplete=""
                register={register}
                fieldName="firstName"
                divClass=""
                required={true}
                error={formState.errors?.firstName}
              />
              <input
                type="hidden"
                {...register('gender', { required: true })}
                value="other"
              />
            </>
          ) : (
            <>
              <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                <Input
                  label={t('Nombre (s)')}
                  type="text"
                  autoComplete="given-name"
                  defaultValue={formState.defaultValues?.firstName}
                  register={register}
                  fieldName="firstName"
                  divClass=""
                  required={true}
                  error={formState.errors?.firstName}
                />
                <Input
                  label={t('Apellido (s)')}
                  type="text"
                  autoComplete="family-name"
                  register={register}
                  fieldName="lastName"
                  required={true}
                  defaultValue={formState.defaultValues?.lastName}
                  error={formState.errors?.lastName}
                />
              </div>
              <Input
                label={t('Nombre con el que quieres aparecer')}
                type="text"
                autoComplete={undefined}
                register={register}
                fieldName="nickName"
                divClass=""
                required={false}
                defaultValue={formState.defaultValues?.nickName}
                error={formState.errors?.nickName}
              />
              <Input
                label={t('Género')}
                type="select"
                register={register}
                fieldName="gender"
                divClass=""
                required={true}
                defaultValue={formState.defaultValues?.gender}
                items={genders.map((gender) => ({
                  key: gender == 'Prefiero no decir' ? 'other' : gender,
                  label: t(gender, { ns: 'genders' }),
                }))}
                error={formState.errors?.gender}
              />
              <Input
                label={t('Fecha de nacimiento')}
                type="date"
                register={register}
                fieldName="birthday"
                autoComplete="birthday"
                divClass=""
                required={false}
                defaultValue={formState.defaultValues?.birthday}
                error={formState.errors?.birthday}
              />
              <p className="text-xs -mt-2">
                {t('Este dato solamente es para uso interno')}
              </p>
            </>
          )}
        </div>
        <div className="flex flex-col gap-4 text-left">
          <h2 className="text-primary">{t('Ubicación')}</h2>
          <Input
            label={t('País')}
            type="custom"
            register={register}
            fieldName="country"
            autoComplete="country"
            divClass=""
            component={CountrySelect<IUpdateBackendProfile>}
            value={country}
            setValue={setValue}
            required={true}
            error={formState.errors?.country}
          />
          {country !== undefined && Object.keys(estados).includes(country) ? (
            <Input
              key={country}
              label={t('Estado')}
              type="select"
              register={register}
              fieldName="state"
              autoComplete="state"
              divClass=""
              required={true}
              error={formState.errors?.state}
              defaultValue={formState.defaultValues?.state}
              items={estados[country as 'MX' | 'CO'].flatMap((estado) => ({
                key: estado,
                label: estado,
              }))}
            />
          ) : (
            <Input
              label={t('Estado')}
              type="text"
              register={register}
              fieldName="state"
              autoComplete="state"
              divClass=""
              required={true}
              error={formState.errors?.state}
            />
          )}
          <Input
            label={t('Ciudad')}
            type="text"
            register={register}
            fieldName="city"
            autoComplete="city"
            divClass=""
            required={true}
            error={formState.errors?.city}
          />
          <Input
            divClass=""
            label={t('CP')}
            type="text"
            fieldName="postalCode"
            autoComplete="postal-code"
            register={register}
            error={formState.errors?.postalCode}
          />
        </div>
        {mutateError !== null && (
          <ErrorMessage
            message={
              isApiError(mutateError)
                ? mutateError.errorCode
                : mutateError.message
            }
          />
        )}
        {!formState.isValid && (
          <p className="text-center w-full ">
            {t('Llena todos los campos marcados con "*"')}
          </p>
        )}
        <div className="flex flex-row gap-4 justify-center">
          <div
            className="button font-bold bg-transparent border border-primary text-black"
            onClick={() => history.back()}
          >
            {t('Regresar')}
          </div>
          <input
            type="submit"
            className="border-none"
            disabled={isPending || !formState.isValid}
            value={t('Continuar')}
          />
        </div>
      </form>
    </DataSuspense>
  );
}

export default BasicInfo;
