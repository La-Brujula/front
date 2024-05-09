import { ContactForm } from '@modules/contact/components/contactForm';
import { InformationCard } from '@modules/contact/components/informationCard';
import { createLazyFileRoute } from '@tanstack/react-router';

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
