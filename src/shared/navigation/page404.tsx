import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Container } from '../layout/container';

export default () => {
  const { t } = useTranslation();
  return (
    <Container bg="lightblue">
      <div className="flex h-footerAware flex-col items-center gap-10 bg-secondary bg-opacity-20 pb-16 pl-8 pr-8 pt-32">
        <div className="z-10 flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-5xl">{t('Esta página no existe')}</h1>
            <p className="text-lg">{t('Sentimos las molestias')}</p>
            <p className="text-xs">{location.pathname}</p>
          </div>
          <div className="flex flex-row justify-center gap-8">
            <Link
              to="/"
              resetScroll
              className="button h-11"
            >
              {t('Página principal')}
            </Link>
          </div>
        </div>
        <img
          src={import.meta.env.BASE_URL + 'img/HalfLogo.svg'}
          alt=""
          className="absolute left-1/2 top-24 w-5/12 min-w-96 -translate-x-1/2 rotate-180 opacity-20"
        />
      </div>
    </Container>
  );
};
