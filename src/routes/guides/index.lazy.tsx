import { createLazyFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import SmallHeroSection from '@/shared/components/smallHero';

import guides from '@shared/constants/guides.json';
import { Container } from '@shared/layout/container';

export const Route = createLazyFileRoute('/guides/')({
  component: PDFGuidesPage,
});

function PDFGuidesPage() {
  const { t } = useTranslation('guides');

  return (
    <>
      <SmallHeroSection />
      <Container className="text-primary">
        <div className="mx-auto mb-8 max-w-3xl">
          <h2>
            {t('Descarga La Brújula en PDF para utilizarla sin conexión')}
          </h2>
          <p>
            {t(
              'La Brújula audiovisual en documentos interactivos, te permiten hacer contacto rápidamente con la persona, empresa, servicio o institución que estas buscando.'
            )}
          </p>
        </div>
        <h3 className="border-b border-primary text-left text-xl font-normal">
          {t('Ediciones regionales')}
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(12rem,_1fr))] gap-8 py-8">
          {guides.regional.map((guide) => (
            <a
              key={guide.name}
              href={guide.link}
              className="max-w-xs overflow-hidden rounded-md"
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
        <h3 className="border-b border-primary text-left text-xl font-normal">
          {t('Ediciones especiales')}
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(12rem,_1fr))] gap-8 py-8">
          {guides.specials.map((guide, i) => (
            <a
              href={guide.link}
              className="max-w-xs overflow-hidden rounded-md"
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
