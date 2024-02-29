import { Container } from '@shared/layout/container';
import { Trans, useTranslation } from 'react-i18next';

export function AboutHero() {
  const { t } = useTranslation('about');
  return (
    <Container>
      <h1 className="mb-8 text-secondary text-4xl">{t('Quiénes somos')}</h1>
      <div
        className="grid grid-cols-1 lg:grid-cols-2 text-primary
    gap-8 text-left"
      >
        <div>
          <h2>
            <Trans
              i18nKey="heroTitle"
              t={t}
            >
              La Brújula.
              <br />
              Red de la industria <br />
              audiovisual y<br />
              cinematográfica
              <br />
              de México.
            </Trans>
          </h2>
          <div className="flex flex-row gap-4 lg:gap-12 items-center">
            <img
              src={import.meta.env.BASE_URL + 'img/MexicoDestFilmAzul.svg'}
              alt={t('mexicoDestinoDeFilmacion')}
              className="h-16 lg:h-20"
            />
            <img
              src={import.meta.env.BASE_URL + 'img/Logo14añosazul.svg'}
              alt={t('logo14años')}
              className="h-20 lg:h-32"
            />
          </div>
        </div>
        <p className="text-justify">
          <Trans
            i18nKey="heroParagraph"
            t={t}
          >
            La Brújula se fundó en 2010 en la ciudad de Guadalajara teniendo
            como antecedente “El Medio”, ambas publicaciones inspiradas por
            directorios especializados en la producción cinematográfica y
            televisiva en Los Ángeles, Nueva York, Toronto y Montreal entre
            otros.
            <br />
            <br />
            Nuestro equipo involucra estrategia, ciencia de datos, tecnologías
            de la información, captura de datos, diseño grafico y editorial,
            traducción, diseño web, vinculación, publicidad, logística,
            distribución, manejo de redes sociales y atención a usuarios.
            <br />
            <br />
            Confiamos en el ejercicio de la vinculación, la creación de redes,
            la gestión de encuentros que nos llevan a hacer comunidad y
            gestionar proyectos que ofrecen un valor cultural y que generan
            fuentes de empleo y oportunidades de negocio para todos los
            involucrados.
          </Trans>
        </p>
      </div>
    </Container>
  );
}
