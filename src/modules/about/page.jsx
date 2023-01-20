import { SeccionAliades } from '../landing/components/aliados';
import { BannerAnuncios } from '../landing/components/bannerAnuncios';
import QuotesSlider from '../landing/components/quotesSlider';
import { CreditsSection } from './components/credits';
import { AboutHero } from './components/hero';

export function AboutUsPage() {
  return (
    <>
      <AboutHero />
      <hr className="bg-primary h-[2px] mx-auto max-w-4xl" />
      <CreditsSection />
      <hr className="bg-primary h-[2px] mx-auto max-w-4xl" />
      <QuotesSlider />
      <BannerAnuncios />
      <SeccionAliades />
    </>
  );
}

export default AboutUsPage;
