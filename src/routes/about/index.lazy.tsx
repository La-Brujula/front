import { bottom as anuncios } from '@shared/constants/anuncios.json';
import { SeccionAliades } from '@modules/landing/components/aliados';
import BannerAnuncios from '@modules/landing/components/bannerAnuncios';
import CreditsSection from '@modules/about/components/credits';
import { AboutHero } from '@modules/about/components/hero';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/about/')({
  component: AboutUsPage,
});

function AboutUsPage() {
  return (
    <>
      <AboutHero />
      <hr className="bg-primary h-[2px] mx-auto max-w-4xl" />
      <CreditsSection />
      <hr className="bg-primary h-[2px] mx-auto max-w-4xl" />
      <BannerAnuncios anuncios={anuncios} />
      <SeccionAliades />
    </>
  );
}
