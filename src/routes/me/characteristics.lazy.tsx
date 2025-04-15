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
        <h2 className="text-secondary">{t('Información Adicional')}</h2>
        <div className="mx-auto grid w-full items-center gap-4 gap-x-8 text-left">
          <Input
            fieldName="biography"
            label={t('Semblanza')}
            type="textArea"
            form={form}
            placeholder={t(
              'Escribe aquí las características que te identifican dentro de la industria'
            )}
          />
          <label
            htmlFor="languages"
            className="text-primary"
          >
            {t('Idioma')}:
          </label>
          <LanguageListForm form={form} />
          <Input
            fieldName="associations"
            label={t('Asociaciones')}
            type="textArea"
            form={form}
            placeholder={t(
              'Escribe aquí a que asociaciones de la industria perteneces'
            )}
          />
          <Input
            fieldName="certifications"
            label={t('Certificaciones')}
            type="textArea"
            form={form}
            placeholder={t(
              'Escribe aquí las certificaciones que has concluido'
            )}
          />
          <Input
            fieldName="awards"
            label={t('Reconocimientos')}
            type="textArea"
            form={form}
            placeholder={t('Escribe aquí los reconocimientos que has obtenido')}
          />
        </div>
        {!!error && (
          <ErrorMessage
            message={isApiError(error) ? error.errorCode : error.message}
          />
        )}
        <div className="flex flex-row gap-4 self-center">
          <Button
            variant="outline"
            onClick={() => history.back()}
          >
            {t('Regresar')}
          </Button>
          <Button
            type="submit"
            disabled={user === undefined || isPending}
          >
            {t('Finalizar')}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CharacteristicsPage;
