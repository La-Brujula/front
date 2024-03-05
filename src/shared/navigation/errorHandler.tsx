import { Trans, useTranslation } from 'react-i18next';
import { Container } from '../layout/container';
import { Link, useLocation, useRouteError } from 'react-router-dom';
import { Navbar } from './navbar';
import { Footer } from './footer';

function ErrorHandler() {
  const { t } = useTranslation();
  const location = useLocation();
  let error: Error = useRouteError() as Error;

  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden w-full z-0">
        <Container
          bg="primary"
          className="text-white h-footerAware !justify-start isolate"
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
                <Link
                  /* El tipado es incompleto, con -1 rediriges a la página anterior */
                  // @ts-ignore
                  to={-1}
                  className="button bg-secondary text-current h-11"
                >
                  {t('Regresar')}
                </Link>
                <Link
                  to=""
                  reloadDocument={true}
                  className="button bg-secondary h-11"
                >
                  {t('Refrescar página actual')}
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-0 text-left shadow-lg border border-white rounded-md overflow-hidden border-opacity-25">
              <p className="bg-primary p-4">
                <Trans
                  i18nKey="errorDescription"
                  t={t}
                >
                  Si gustas ayudarnos a mejorar, puedes mandarnos una captura de
                  pantalla con la siguiente información:
                </Trans>
              </p>
              <div className="p-4 bg-secondary text-sm">
                <b>{location.pathname}</b>
                <br />
                <br />
                {error.name}
                <br />
                {error.message}
                <br />
                {error.stack?.split('\n').flatMap((line) => {
                  const [func, loc] = line.split('@');
                  if (loc.includes('node_modules')) return;
                  return (
                    <>
                      <br />
                      <span>{func}</span>
                      <br />
                      <b>{loc}</b>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default ErrorHandler;
