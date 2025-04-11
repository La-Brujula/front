import { Trans, useTranslation } from 'react-i18next';

import { Container } from '@/shared/layout/container';

function BrujulaBio() {
  const { t } = useTranslation('landing');
  return (
    <Container bg="primary">
      <p className="w-full grow text-center text-5xl font-medium text-white">
        🇲🇽 🇨🇴
      </p>
      <p className="w-full grow text-justify text-lg font-medium text-white">
        <Trans
          i18nKey="landingParagraph"
          t={t}
        >
          Durante 15 años nos hemos dedicado a reunir a las personas, empresas e
          instituciones del medio audiovisual y cinematográfico de México para
          que las puedas encontrar en un solo lugar.
          <br />
          <span className="block text-center font-semibold text-blue">
            ¡En La Brújula seguimos construyendo!
          </span>
        </Trans>
      </p>
    </Container>
  );
}

export default BrujulaBio;
