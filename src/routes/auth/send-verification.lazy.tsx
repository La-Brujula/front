import { useSendEmailVerification } from '@/modules/auth/hooks/emailVerification';
import DataSuspense from '@/shared/components/dataSuspense';
import { Container } from '@/shared/layout/container';
import { createLazyFileRoute } from '@tanstack/react-router';
import { MouseEventHandler, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/auth/send-verification')({
  component: VerifyEmail,
});

function VerifyEmail() {
  const { t } = useTranslation('auth');
  const [clicked, setClicked] = useState(false);
  const { mutate, isPending, error, isSuccess } = useSendEmailVerification();

  const buttonHandler: MouseEventHandler<HTMLButtonElement> = useCallback(
    (ev) => {
      ev.preventDefault();
      mutate();
      setClicked(true);
    },
    [mutate, setClicked]
  );

  return (
    <Container
      bg="light"
      className="min-h-96"
    >
      <div className="flex flex-col gap-4">
        {!clicked ? (
          <>
            <h1>{t('Verificación de correo')}</h1>
            <p>
              {t(
                'Te enviaremos una liga especial al correo de tu cuenta. Tienes 30 minutos para hacer click en ella y verificar tu correo'
              )}
            </p>
            <button
              onClick={buttonHandler}
              disabled={isPending || isSuccess}
            >
              {t('Haz click aquí para enviar el correo')}
            </button>
          </>
        ) : (
          <DataSuspense
            loading={isPending}
            error={error}
            fallback={<p>{t('Enviando...')}</p>}
          >
            <div className="bg-emerald-500 bg-opacity-25 border border-emerald-500 p-4">
              <h2>{t('Se envió el correo')}</h2>
              <p>
                {t(
                  'Revisa tu correo registrado y haz click en la liga que te enviamos para verificar tu correo.'
                )}
              </p>
            </div>
          </DataSuspense>
        )}
      </div>
    </Container>
  );
}
