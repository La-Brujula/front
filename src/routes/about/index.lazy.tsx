import { createLazyFileRoute } from '@tanstack/react-router';

import HeroSection from '@/modules/landing/components/heroSection';

import { bottom as anuncios } from '@shared/constants/anuncios.json';

import CreditsSection from '@modules/about/components/credits';
import { SeccionAliades } from '@modules/landing/components/aliados';
import BannerAnuncios from '@modules/landing/components/bannerAnuncios';

export const Route = createLazyFileRoute('/about/')({
  component: AboutUsPage,
});

function AboutUsPage() {
  return (
    <>
      <HeroSection />
      <hr className="mx-auto h-[2px] max-w-4xl bg-primary" />
      <CreditsSection />
      <hr className="mx-auto h-[2px] max-w-4xl bg-primary" />
      <BannerAnuncios anuncios={anuncios} />
      <SeccionAliades />
    </>
  );
}
