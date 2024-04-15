import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { LanguageListForm } from '../../../modules/auth/components/languageListForm';
import { IUpdateBackendProfile } from '@/shared/types/user';
import {
  createLazyFileRoute,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import { useCurrentProfile } from '@/shared/hooks/useCurrentProfile';
import { useUpdateMe } from '@/shared/hooks/useUpdateMe';
import { ErrorMessage } from '@/shared/components/errorMessage';
import Input from '@/shared/components/input';
import DataSuspense from '@/shared/components/dataSuspense';

export const Route = createLazyFileRoute('/profile/_edit/characteristics')({
  component: CharacteristicsPage,
});

function CharacteristicsPage() {
  const { data: user, isLoading, error } = useCurrentProfile();
  const { register, handleSubmit, setValue, formState } =
    useForm<IUpdateBackendProfile>({ defaultValues: user });
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const { history } = useRouter();

  useMemo(() => {
    !!user &&
      Object.entries(user).forEach(([key, value]) =>
        setValue(key as keyof IUpdateBackendProfile, value)
      );
  }, [user]);

  const { mutate, isPending, error: mutateError } = useUpdateMe();

  const onSubmit = useCallback(
    async (data: IUpdateBackendProfile) => {
      if (user === undefined) throw Error('User is not loaded');
      mutate(data, {
        onSuccess: () =>
          navigate({ to: '/profile/$userId', params: { userId: user!.id } }),
      });
    },
    [mutate, navigate, user]
  );

  return (
    <DataSuspense
      loading={isLoading}
      error={error}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 w-full items-stretch"
      >
        <h2 className="col-span-full text-secondary">
          {t('Información Adicional')}
        </h2>
        <div
          className="grid grid-cols-[min-content_1fr]
        text-left gap-4 mx-auto items-center gap-x-8 w-full"
        >
          <Input
            fieldName="biography"
            label={t('Semblanza')}
            type="textArea"
            rows={5}
            maxLength={500}
            register={register}
            placeholder={t(
              'Escribe aquí las características que te identifican dentro de la industria'
            )}
            divClass="grid grid-cols-subgrid col-span-2"
            inputClass="rounded-md bg-black bg-opacity-20 resize-none col-span-2 p-4"
          />
          <label
            htmlFor="languages"
            className="text-primary"
          >
            {t('Idioma')}:
          </label>
          <LanguageListForm
            setValue={setValue}
            fieldName="languages"
            defaultState={user?.languages}
          />
          <Input
            fieldName="associations"
            label={t('Asociaciones')}
            type="textArea"
            rows={3}
            maxLength={300}
            register={register}
            placeholder={t(
              'Escribe aquí a que asociaciones de la industria perteneces'
            )}
            divClass="grid grid-cols-subgrid col-span-2"
            inputClass="rounded-md bg-black bg-opacity-20 resize-none col-span-2 p-4"
          />
          <Input
            fieldName="certifications"
            label={t('Certificaciones')}
            type="textArea"
            rows={3}
            maxLength={300}
            register={register}
            placeholder={t(
              'Escribe aquí las certificaciones que has concluido'
            )}
            divClass="grid grid-cols-subgrid col-span-2"
            inputClass="rounded-md bg-black bg-opacity-20 resize-none col-span-2 p-4"
          />
          <Input
            fieldName="awards"
            label={t('Reconocimientos')}
            type="textArea"
            rows={3}
            maxLength={300}
            register={register}
            placeholder={t('Escribe aquí los reconocimientos que has obtenido')}
            divClass="grid grid-cols-subgrid col-span-2"
            inputClass="rounded-md bg-black bg-opacity-20 resize-none col-span-2 p-4"
          />
        </div>
        {!!mutateError && <ErrorMessage message={mutateError.message} />}
        <div className="flex flex-row gap-4 self-center">
          <div
            className="button font-bold bg-transparent border border-primary text-black"
            onClick={history.back}
          >
            {t('Regresar')}
          </div>
          <input
            type="submit"
            className="border-none"
            disabled={user === undefined || isPending || !formState.isValid}
            value={t('Finalizar')}
          />
        </div>
      </form>
    </DataSuspense>
  );
}

export default CharacteristicsPage;
