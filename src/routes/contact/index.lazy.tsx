import { createLazyFileRoute } from '@tanstack/react-router';

import { ContactForm } from '@modules/contact/components/contactForm';
import { InformationCard } from '@modules/contact/components/informationCard';

export const Route = createLazyFileRoute('/contact/')({
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <InformationCard />
      <ContactForm />
    </>
  );
}
