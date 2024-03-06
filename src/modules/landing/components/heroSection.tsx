import { Container } from '@shared/layout/container';
import { Trans, useTranslation } from 'react-i18next';

function HeroSection() {
  const { t } = useTranslation('landing');
  return (
    <Container bg="primary">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-16 text-justify text-white pb-2 pt-0 xl:py-8 items-center ">
        <div className="grow w-full flex flex-col gap-4 lg:gap-12">
          <h1 className="font-bold text-3xl md:text-6xl lg:text-5xl leading-tight">
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
          <div className="flex flex-row gap-4 lg:gap-12 items-center">
            <img
              src={import.meta.env.BASE_URL + 'img/MexicoDestFilm.svg'}
              alt={t('mexicoDestinoDeFilmacion')}
              className="h-16 lg:h-20"
            />
            <img
              src={import.meta.env.BASE_URL + 'img/Logo14anos.svg'}
              alt={t('14YearsBruj')}
              className="h-20 lg:h-32"
            />
          </div>
        </div>
        <p className="grow w-full font-medium text-lg text-justify">
          <Trans
            i18nKey="landingParagraph"
            t={t}
          >
            Durante 14 años nos hemos dedicado a reunir a las personas, empresas
            e instituciones del medio audiovisual y cinematográfico de México
            para que las puedas encontrar en un solo lugar.
            <br />
            <span className="text-blue font-semibold block text-center">
              ¡En La Brújula seguimos construyendo!
            </span>
          </Trans>
        </p>
      </div>
    </Container>
  );
}

export default HeroSection;
