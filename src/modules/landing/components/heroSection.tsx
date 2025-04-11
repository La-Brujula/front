import { Trans, useTranslation } from 'react-i18next';

import { Container } from '@shared/layout/container';

function HeroSection() {
  const { t } = useTranslation('landing');
  return (
    <Container bg="primary">
      <div className="grid grid-cols-1 items-center gap-4 pb-2 pt-0 text-white sm:grid-cols-2 lg:gap-16 xl:py-8">
        <h1 className="text-start text-3xl font-bold leading-tight md:text-6xl lg:text-5xl">
          <Trans
            i18nKey="heroTitle"
            t={t}
          >
            La Brújula.
            <br />
            Red de la industria'
            <br />
            audiovisual y
            <br />
            cinematográfica
            <br />
            de México.
          </Trans>
        </h1>
        <div className="flex h-full w-full items-center justify-center lg:items-end">
          <img
            src={import.meta.env.BASE_URL + 'img/Logo14anos.svg'}
            alt={t('14YearsBruj')}
            className="h-24 lg:h-32"
          />
        </div>
      </div>
    </Container>
  );
}

export default HeroSection;
