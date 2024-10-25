import { Container } from '@shared/layout/container';
import { Trans, useTranslation } from 'react-i18next';

function HeroSection() {
  const { t } = useTranslation('landing');
  return (
    <Container bg="primary">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-16 text-white pb-2 pt-0 xl:py-8 items-center">
        <h1 className="font-bold text-3xl md:text-6xl lg:text-5xl leading-tight text-start">
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
        <div className="flex items-center justify-center lg:items-end h-full w-full">
          <img
            src={import.meta.env.BASE_URL + 'img/Logo14anos.svg'}
            alt={t('14YearsBruj')}
            className="h-20 lg:h-32"
          />
        </div>
      </div>
    </Container>
  );
}

export default HeroSection;
