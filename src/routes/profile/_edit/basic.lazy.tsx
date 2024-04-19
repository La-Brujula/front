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

export const Route = createLazyFileRoute('/profile/_edit/basic')({
  component: BasicInfo,
});

function BasicInfo() {
  const navigate = useNavigate();
  const { history } = useRouter();

  const { t } = useTranslation(['auth', 'genders']);

  const { mutate, isPending, error: mutateError } = useUpdateMe();
  const { data: user, isLoading: loading, error } = useCurrentProfile();

  const { register, handleSubmit, formState, setError } =
    useForm<IUpdateBackendProfile>({
      defaultValues: {
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

  const onSubmit = useCallback(
    async (data: IUpdateBackendProfile) => {
      mutate(data, {
        onSuccess: () =>
          navigate({ to: '/profile/edit/areas', resetScroll: true }),
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
        className="grid grid-cols-[max-content_minmax(12rem,_24rem)]
        text-left gap-8 mx-auto max-w-lg"
      >
        <p className="col-span-full text-sm">*{t('información obligatoria')}</p>
        <div className="grid col-span-full grid-cols-subgrid gap-4">
          <h2 className="col-span-full text-primary">
            {t('Información básica')}
          </h2>
          <Input
            label={user?.type == 'moral' ? t('Razón Social') : t('Nombre (s)')}
            type="text"
            autoComplete={user?.type != 'moral' ? 'given-name' : ''}
            register={register}
            fieldName="firstName"
            divClass={user?.type == 'moral' ? 'col-span-full' : ''}
            required={true}
            error={formState.errors.firstName}
          />
          {user?.type != 'moral' ? (
            <>
              <Input
                label={t('Apellido (s)')}
                type="text"
                autoComplete="family-name"
                register={register}
                fieldName="lastName"
                divClass=""
                required={true}
                error={formState.errors.lastName}
              />
              <Input
                label={t('Nombre con el que quieres aparecer')}
                type="text"
                autoComplete={undefined}
                register={register}
                fieldName="nickName"
                divClass="col-span-full"
                required={false}
                error={formState.errors.nickName}
              />
              <Input
                label={t('Género')}
                type="select"
                register={register}
                fieldName="gender"
                divClass="col-span-full"
                required={true}
                items={genders.map((gender) => ({
                  key: gender == 'Prefiero no decir' ? 'other' : gender,
                  label: t(gender, { ns: 'genders' }),
                }))}
                error={formState.errors.gender}
              />
              <Input
                label={t('Fecha de nacimiento')}
                type="date"
                register={register}
                fieldName="birthday"
                autoComplete="birthday"
                divClass="col-span-full"
                required={false}
                error={formState.errors.birthday}
              />
              <p className="col-span-full text-xs -mt-2">
                {t('Este dato solamente es para uso interno')}
              </p>
            </>
          ) : (
            <input
              type="hidden"
              {...register('gender', { required: true })}
              value="other"
            />
          )}
        </div>
        <div className="grid col-span-full grid-cols-subgrid gap-4 text-left">
          <h2 className="col-span-full text-primary">{t('Ubicación')}</h2>
          <Input
            label={t('País')}
            type="custom"
            register={register}
            fieldName="country"
            autoComplete="country"
            divClass="col-span-full"
            component={CountrySelect<IUpdateBackendProfile>}
            required={true}
            error={formState.errors.country}
          />
          <Input
            label={t('Estado')}
            type="state"
            register={register}
            fieldName="state"
            autoComplete="state"
            divClass="col-span-full"
            required={true}
            error={formState.errors.state}
          />
          <Input
            label={t('Ciudad')}
            type="city"
            register={register}
            fieldName="city"
            autoComplete="city"
            divClass="col-span-full"
            required={true}
            error={formState.errors.city}
          />
          <Input
            divClass="col-span-full"
            label={t('CP')}
            type="text"
            fieldName="postalCode"
            autoComplete="postal-code"
            register={register}
            error={formState.errors.postalCode}
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
        <div className="col-span-full flex flex-row gap-4 justify-center">
          <div
            className="button font-bold bg-transparent border border-primary text-black"
            onClick={history.back}
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
