import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageListForm } from '../../modules/auth/components/languageListForm';
import { TProfileUpdateForm, TProfileUpdateRequest } from '@/shared/types/user';
import {
  createLazyFileRoute,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import { ErrorMessage } from '@/shared/components/errorMessage';
import Input from '@/shared/components/input';
import { isApiError } from '@/shared/services/backendFetcher';
import useUpdateProfile from '@/modules/me/hooks/updateProfileHook';

export const Route = createLazyFileRoute('/me/characteristics')({
  component: CharacteristicsPage,
});

function CharacteristicsPage() {
  const navigate = useNavigate();
  const { history } = useRouter();

  const { t } = useTranslation('auth');

  const {
    register,
    handleSubmit,
    setValue,
    formState,
    updateProfile,
    isPending,
    error,
    user,
  } = useUpdateProfile();

  const onSubmit = useCallback(
    async (data: TProfileUpdateForm) => {
      if (user === undefined) throw Error('User is not loaded');
      updateProfile(data, {
        onSuccess: () =>
          navigate({
            to: '/profile/$userId',
            params: { userId: 'me' },
            resetScroll: true,
          }),
      });
    },
    [updateProfile, navigate, user]
  );

  return (
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
          placeholder={t('Escribe aquí las certificaciones que has concluido')}
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
      {!!error && (
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
          className="border-none"
          disabled={user === undefined || isPending}
          value={t('Finalizar')}
        />
      </div>
    </form>
  );
}

export default CharacteristicsPage;
