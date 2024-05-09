import { Trans, useTranslation } from 'react-i18next';
import { Container } from '../layout/container';

function SmallHeroSection() {
  const { t } = useTranslation('announcements');
  return (
    <Container
      bg="primary"
      className="text-white"
    >
      <h2>
        <Trans
          t={t}
          i18nKey="brujulaHeadline"
        >
          La Brújula.
          <br />
          Red de la industria audiovisual y cinematográfica de México.
        </Trans>
      </h2>
    </Container>
  );
}

export default SmallHeroSection;
