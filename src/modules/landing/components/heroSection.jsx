import { Container } from '@shared/layout/container';
import { useTranslation } from 'react-i18next';

function HeroSection() {
  const { t } = useTranslation('landing');
  return (
    <Container bg="primary">
      <div className="flex flex-col lg:flex-row gap-16 text-left text-white max-w-5xl mx-auto py-8">
        <div className="grow w-full flex flex-col gap-12">
          <h1 className="font-bold text-3xl lg:text-5xl leading-tight">
            La Brujula,
            <br />
            guía de producción <br />
            audiovisual y<br />
            cinematográfica
            <br />
            de México.
          </h1>
          <div className="flex flex-row gap-8 lg:gap-12 items-center">
            <img
              src={import.meta.env.BASE_URL + 'img/MexicoDestFilm.svg'}
              alt={t('mexicoDestinoDeFilmacion')}
              className="h-16 lg:h-20"
            />
            <img
              src={import.meta.env.BASE_URL + 'img/13AniosBruj.svg'}
              alt={t('13YearsBruj')}
              className="h-32"
            />
          </div>
        </div>
        <p className="grow w-full font-medium text-lg">
          Después de 13 años reuniendo a las personas, empresas e instituciones
          del medio audiovisual y cinematográfico de México{' '}
          <span className="text-blue font-semibold">
            ¡En La Brújula seguimos construyendo!
          </span>
          <br />
          <br />
          Durante este tiempo hemos facilitado a innumerables producciones la
          búsqueda y contratación de equipos, foros, locaciones, catering,
          hoteles, transporte, arte, diseño vestuario, guiones, etc., entre
          nuestros más de 6,000 contactos en el país.
          <br />
          <br />
          Ahora, en la nueva etapa de La Brújula, desarrollamos una plataforma
          dedicada a hacer conexiones directas, que vinculen a los proyectos y a
          las empresas con las personas que pueden participar en ellos.
          <br />
          <br />
          Queremos que tu empresa, tu proyecto, tu mismo, sean parte de La
          Brújula.
        </p>
      </div>
    </Container>
  );
}

export default HeroSection;
