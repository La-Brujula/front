import { Container } from '@/shared/layout/container';
import { Trans, useTranslation } from 'react-i18next';

function BrujulaBio() {
  const { t } = useTranslation('landing');
  return (
    <Container bg="primary">
      <p className="grow w-full font-medium text-lg text-justify text-white">
        <Trans
          i18nKey="landingParagraph"
          t={t}
        >
          Durante 14 años nos hemos dedicado a reunir a las personas, empresas e
          instituciones del medio audiovisual y cinematográfico de México para
          que las puedas encontrar en un solo lugar.
          <br />
          <span className="text-blue font-semibold block text-center">
            ¡En La Brújula seguimos construyendo!
          </span>
        </Trans>
      </p>
    </Container>
  );
}

export default BrujulaBio;
