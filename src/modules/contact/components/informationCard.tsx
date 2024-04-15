import EmailOutlined from '@mui/icons-material/EmailOutlined';
import PhoneOutlined from '@mui/icons-material/PhoneOutlined';
import PinOutlined from '@mui/icons-material/PinDropOutlined';
import WhatsApp from '@mui/icons-material/WhatsApp';
import { SocialLinks } from '@shared/components/socials';
import contactInformation from '@shared/constants/brujulaInformation.json';
import { Container } from '@shared/layout/container';
import { Trans, useTranslation } from 'react-i18next';
//i18next-parser static types

// name
// t('contact:Directora')
// t('contact:Diseño')
// t('contact:Contacto')

export function InformationCard() {
  const { t } = useTranslation('contact');
  return (
    <Container bg="bottom-half-grey">
      <h1 className="mb-8 text-secondary text-4xl">{t('Contacto')}</h1>
      <div
        className="bg-primary text-white p-8 grid max-w-6xl
      gap-x-4 gap-y-4 grid-cols-1 mx-auto rounded-lg text-left
      lg:grid-cols-[max-content_max-content_1fr] items-center
      justify-center lg:justify-start mb-8"
      >
        <WhatsApp />
        <h2 className="text-lg lg:px-4">{t('Whatsapp')}</h2>
        <a
          href={contactInformation.whatsapp}
          className="text-white"
        >
          {contactInformation.phoneNumbers[0]}
        </a>
        <div className="h-[2px] rounded-lg bg-white lg:col-span-3" />
        <PhoneOutlined />
        <h2 className="text-lg lg:px-4">{t('Teléfono')}</h2>
        <p>
          {contactInformation.phoneNumbers.map((phone) => (
            <span key={phone}>
              {phone} <br />
            </span>
          ))}
        </p>
        <div className="h-[2px] rounded-lg bg-white lg:col-span-3" />
        <EmailOutlined />
        <h2 className="text-lg lg:px-4">{t('Correo electrónico')}</h2>
        <div className="grid grid-cols-[max-content_1fr] gap-x-4">
          {contactInformation.emails.map(({ name, email }) => (
            <div key={email}>
              <p>{t(name)}</p>
              <a
                href={`mailto:${email}`}
                className="block text-white truncate"
              >
                {email}
              </a>
            </div>
          ))}
        </div>
        <div className="h-[2px] rounded-lg bg-white lg:col-span-3" />
        <PinOutlined />
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
