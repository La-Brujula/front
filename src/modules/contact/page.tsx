import React from 'react';
import { ContactForm } from './components/contactForm';
import { InformationCard } from './components/informationCard';

export function ContactPage() {
  return (
    <>
      <InformationCard />
      <ContactForm />
    </>
  );
}

export default ContactPage;
