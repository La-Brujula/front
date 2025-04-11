import { MailIcon, PhoneIcon, PinIcon } from 'lucide-react';
import { Trans, useTranslation } from 'react-i18next';

import WhatsApp from '@/shared/icons/whatsapp';

import { SocialLinks } from '@shared/components/socials';
import contactInformation from '@shared/constants/brujulaInformation.json';
import { Container } from '@shared/layout/container';

//i18next-parser static types

// name
// t('contact:Directora')
// t('contact:Diseño')
// t('contact:Contacto')

export function InformationCard() {
  const { t } = useTranslation('contact');
  return (
    <Container bg="bottom-half-grey">
      <h1 className="mb-8 text-4xl text-secondary">{t('Contacto')}</h1>
      <div className="mx-auto mb-8 grid max-w-6xl grid-cols-1 items-center justify-center gap-x-4 gap-y-4 rounded-lg bg-primary p-8 text-left text-white lg:grid-cols-[max-content_max-content_1fr] lg:justify-start">
        <WhatsApp />
        <h2 className="text-lg lg:px-4">{t('Whatsapp')}</h2>
        <a
          href={contactInformation.whatsapp}
          className="text-white"
        >
          {contactInformation.phoneNumbers[0]}
        </a>
        <div className="h-[2px] rounded-lg bg-white lg:col-span-3" />
        <PhoneIcon />
        <h2 className="text-lg lg:px-4">{t('Teléfono')}</h2>
        <p>
          {contactInformation.phoneNumbers.map((phone) => (
            <span key={phone}>
              {phone} <br />
            </span>
          ))}
        </p>
        <div className="h-[2px] rounded-lg bg-white lg:col-span-3" />
        <MailIcon />
        <h2 className="text-lg lg:px-4">{t('Correo electrónico')}</h2>
        <div className="grid gap-x-4 md:grid-cols-[max-content_1fr]">
          {contactInformation.emails.map(({ name, email }) => (
            <div key={email}>
              <p>{t(name)}</p>
              <a
                href={`mailto:${email}`}
                className="block truncate text-white"
              >
                {email}
              </a>
            </div>
          ))}
        </div>
        <div className="h-[2px] rounded-lg bg-white lg:col-span-3" />
        <PinIcon />
        <h2 className="text-lg lg:px-4">{t('Visítanos')}</h2>
        <p>
          <Trans
            i18nKey="address"
            t={t}
          >
            {contactInformation.address}
          </Trans>
        </p>
      </div>
      <SocialLinks />
    </Container>
  );
}
