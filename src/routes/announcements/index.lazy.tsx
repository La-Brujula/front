import MigrationAnnouncement from '@/modules/announcements/migrationAnnouncement';
import guides from '@shared/constants/guides.json';
import { Container } from '@shared/layout/container';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Trans, useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/announcements/')({
  component: AnnouncementsPage,
});

function AnnouncementsPage() {
  const { t } = useTranslation('announcements');

  return (
    <>
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
      <Container className="text-primary">
        <div className="max-w-3xl mx-auto mb-8">
          <h1>{t('Anuncios')}</h1>
          <p>{t('Mantente al día sobre lo que pasa en La Brújula')}</p>
        </div>
        <MigrationAnnouncement />
      </Container>
    </>
  );
}
