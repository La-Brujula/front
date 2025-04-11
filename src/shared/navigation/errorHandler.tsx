import { useMemo } from 'react';

import {
  ErrorComponentProps,
  Navigate,
  useRouter,
} from '@tanstack/react-router';
import { usePostHog } from 'posthog-js/react';
import { Trans, useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';

import useReportError from '../hooks/useSendBugReport';
import { Container } from '../layout/container';

function ErrorHandler(props: ErrorComponentProps) {
  const posthog = usePostHog();
  const { t } = useTranslation();
  const { history } = useRouter();
  const { mutate, error, isSuccess } = useReportError();

  const moduleLoadFailedRegex = useMemo(
    () =>
      new RegExp('(Failed to fetch dynamically imported module)|(preload CSS)'),
    []
  );

  useMemo(() => {
    const error = props.error as Error;
    import.meta.env.DEV ||
      moduleLoadFailedRegex.test(error.message) ||
      mutate({
        pathname: window.location.pathname,
        name: error.name,
        stack: error.stack || '',
        message: error.message,
      });
  }, [props.error]);

  if (moduleLoadFailedRegex.test((props.error as Error)?.message || '')) {
    location.replace(location.href + '?n=0');
    // Return navigate component so route always returns element
    return <Navigate to={location.href + '?n=0'} />;
  }

  posthog.capture('encountered_bug', {
    name: (props.error as Error).name,
    message: (props.error as Error).message,
  });
  return (
    <Container
      bg="primary"
      className="text-white"
    >
      <img
        src={import.meta.env.BASE_URL + 'img/HalfLogo.svg'}
        alt=""
        className="pointer-events-none absolute left-1/2 top-24 -z-10 w-5/12 min-w-96 -translate-x-1/2 rotate-180 opacity-20"
      />
      <div className="grid grid-cols-1 gap-8 align-top md:grid-cols-2">
        <div className="flex flex-col gap-8 text-left">
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
            <Button
              onClick={() => history.back()}
              className="button h-11 bg-secondary text-current"
            >
              {t('Regresar')}
            </Button>
            <Button
              onClick={() => window.location.reload()}
              className="button h-11 bg-secondary"
            >
              {t('Refrescar página actual')}
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-0 overflow-hidden rounded-md border border-white border-opacity-25 text-left shadow-lg">
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
              <div className="flex flex-col gap-8 bg-secondary p-4 text-sm">
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
                      if (loc?.includes('node_modules')) return;
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
