import JobsAnnouncement from '@/modules/announcements/jobsBoard';
import MigrationAnnouncement from '@/modules/announcements/migrationAnnouncement';
import SmallHeroSection from '@/shared/components/smallHero';
import { Container } from '@shared/layout/container';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/announcements/')({
  component: AnnouncementsPage,
});

function AnnouncementsPage() {
  const { t } = useTranslation('announcements');

  return (
    <>
      <SmallHeroSection />
      <Container className="text-primary">
        <div className="max-w-3xl mx-auto mb-8">
          <h1>{t('Anuncios')}</h1>
          <p>{t('Mantente al día sobre lo que pasa en La Brújula')}</p>
        </div>
        <JobsAnnouncement />
        <MigrationAnnouncement />
      </Container>
    </>
  );
}
