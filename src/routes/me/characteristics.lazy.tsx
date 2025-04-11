import { useCallback, useMemo } from 'react';

import {
  createLazyFileRoute,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useUpdateProfile from '@/modules/me/hooks/updateProfileHook';
import { ErrorMessage } from '@/shared/components/errorMessage';
import Input from '@/shared/components/input';
import { isApiError } from '@/shared/services/backendFetcher';
import { TProfileUpdateForm } from '@/shared/types/user';

import { LanguageListForm } from '../../modules/auth/components/languageListForm';

export const Route = createLazyFileRoute('/me/characteristics')({
  component: CharacteristicsPage,
});

function CharacteristicsPage() {
  const navigate = useNavigate();
  const { history } = useRouter();

  const { t } = useTranslation('auth');

  const { form, createOnSubmit, isPending, error, user } = useUpdateProfile();

  const onSuccess = useCallback(
    () =>
      navigate({
        to: '/profile/$userId',
        params: { userId: 'me' },
        resetScroll: true,
      }),
    []
  );

  const onSubmit = useMemo(
    () => createOnSubmit(onSuccess),
    [onSuccess, createOnSubmit]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-stretch gap-8"
      >
        <h2 className="col-span-full text-secondary">
          {t('Información Adicional')}
        </h2>
        <div className="mx-auto grid w-full grid-cols-[min-content_1fr] items-center gap-4 gap-x-8 text-left">
          <Input
            fieldName="biography"
            label={t('Semblanza')}
            type="textArea"
            maxLength={500}
            form={form}
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
            setValue={form.setValue}
            fieldName="languages"
            defaultState={user?.languages}
          />
          <Input
            fieldName="associations"
            label={t('Asociaciones')}
            type="textArea"
            maxLength={300}
            form={form}
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
            maxLength={300}
            form={form}
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
            maxLength={300}
            form={form}
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
          <Button
            className="button border border-primary bg-transparent font-bold text-black"
            onClick={() => history.back()}
          >
            {t('Regresar')}
          </Button>
          <Button
            type="submit"
            className="border-none"
            disabled={user === undefined || isPending}
            value={t('Finalizar')}
          />
        </div>
      </form>
    </Form>
  );
}

export default CharacteristicsPage;
