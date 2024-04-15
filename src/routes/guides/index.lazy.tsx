import guides from '@shared/constants/guides.json';
import { Container } from '@shared/layout/container';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/guides/')({
  component: PDFGuidesPage,
});

function PDFGuidesPage() {
  const { t } = useTranslation('guides');

  return (
    <>
      <Container
        bg="primary"
        className="text-white"
      >
        <h2>
          La Brújula.
          <br />
          Red de la industria <br />
          audiovisual y cinematográfica
          <br />
          de México.
        </h2>
        <div className="flex flex-row gap-4 lg:gap-12 items-center justify-center">
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
      </Container>
      <Container className="text-primary">
        <div className="max-w-3xl mx-auto mb-8">
          <h2>
            {t('Descarga La Brújula en PDF para utilizarla sin conexión')}
          </h2>
          <p>
            {t(
              'La Brújula audiovisual en documentos interactivos, te permiten hacer contacto rápidamente con la persona, empresa, servicio o institución que estas buscando.'
            )}
          </p>
        </div>
        <h3
          className="border-b border-primary text-left
        font-normal text-xl"
        >
          {t('Ediciones regionales')}
        </h3>
        <div
          className="grid grid-cols-[repeat(auto-fit,_minmax(12rem,_1fr))] gap-8
        py-8"
        >
          {guides.regional.map((guide) => (
            <a
              key={guide.name}
              href={guide.link}
              className="overflow-hidden rounded-md max-w-xs"
              download
            >
              <img
                src={guide.thumbnail}
                alt={guide.name}
                className="w-full"
              />
            </a>
          ))}
        </div>
        <h3
          className="border-b border-primary text-left
        font-normal text-xl"
        >
          {t('Ediciones especiales')}
        </h3>
        <div
          className="grid grid-cols-[repeat(auto-fit,_minmax(12rem,_1fr))] gap-8
        py-8"
        >
          {guides.specials.map((guide, i) => (
            <a
              href={guide.link}
              className="overflow-hidden rounded-md max-w-xs"
              download
              key={guide.name + i}
            >
              <img
                src={guide.thumbnail}
                alt={guide.name}
                className="w-full"
              />
            </a>
          ))}
          {/* Added to preserve sizing with the above guides */}
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
        </div>
      </Container>
    </>
  );
}
