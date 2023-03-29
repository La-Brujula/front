import guides from '@shared/constants/guides.json';
import { Container } from '@shared/layout/container';
import { useTranslation } from 'react-i18next';

export function DataPage() {
  const { t } = useTranslation('guides');

  return (
    <>
      <Container className="text-primary">
        <div className="max-w-3xl mx-auto mb-8">
          <h2>
            {t('Estadisticas')}
          </h2>
          <p>
            {t(
              'La Brújula audiovisual en documentos interactivos, te permiten hacer contacto rápidamente con la persona, empresa, servicio o institución que estas buscando.'
            )}
          </p>
        </div>
      </Container>
    </>
  );
}

export default DataPage;
