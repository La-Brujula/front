import { Trans, useTranslation } from 'react-i18next';
import { Container } from '../layout/container';
import { ErrorComponentProps, useRouter } from '@tanstack/react-router';
import useReportError from '../hooks/useSendBugReport';
import { useMemo } from 'react';

function ErrorHandler(props: ErrorComponentProps) {
  const { t } = useTranslation();
  const { history } = useRouter();
  const { mutate, error, isSuccess } = useReportError();

  useMemo(() => {
    const error = props.error as Error;
    mutate({
      pathname: window.location.pathname,
      name: error.name,
      stack: error.stack || '',
      message: error.message,
    });
  }, [props.error]);

  return (
    <Container
      bg="primary"
      className="text-white"
    >
      <img
        src={import.meta.env.BASE_URL + 'img/HalfLogo.svg'}
        alt=""
        className="absolute opacity-20 top-24 -translate-x-1/2 rotate-180 left-1/2 w-5/12 min-w-96 -z-10 pointer-events-none"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 align-top">
        <div className="text-left flex flex-col gap-8">
          <h1>
            <Trans
              i18nKey="errorTitle"
              t={t}
            >
              Algo salió mal,
              <br />
              pero no fue tu culpa
            </Trans>
          </h1>
          <div className="flex flex-row justify-start gap-8">
            <button
              onClick={history.back}
              className="button bg-secondary text-current h-11"
            >
              {t('Regresar')}
            </button>
            <button
              onClick={window.location.reload}
              className="button bg-secondary h-11"
            >
              {t('Refrescar página actual')}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-0 text-left shadow-lg border border-white rounded-md overflow-hidden border-opacity-25">
          {error !== undefined && (
            <>
              <p className="bg-primary p-4">
                <Trans
                  i18nKey="errorDescription"
                  t={t}
                >
                  Si gustas ayudarnos a mejorar, puedes mandarnos una captura de
                  pantalla con la siguiente información:
                </Trans>
              </p>
              <div className="p-4 bg-secondary text-sm flex flex-col gap-8">
                <b>{location.pathname}</b>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <span className="text-base">
                      {(props.error as Error).name}
                    </span>
                    <span className="text-sm">
                      {(props.error as Error).message}
                    </span>
                  </div>
                  {(props.error as Error).stack
                    ?.split('\n')
                    .flatMap((line: string) => {
                      const [func, loc] = line.split('@');
                      if (loc.includes('node_modules')) return;
                      return (
                        <div
                          className="flex flex-col"
                          key={loc}
                        >
                          <b>{func}</b>
                          <span>{loc}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </>
          )}
          {isSuccess && (
            <p className="bg-primary p-4">
              <Trans
                i18nKey="reportSent"
                t={t}
              >
                No te preocupes, ya le avisamos a nuestro equipo para mejorar tu
                experiencia
              </Trans>
            </p>
          )}
        </div>
      </div>
    </Container>
  );
}

export default ErrorHandler;
