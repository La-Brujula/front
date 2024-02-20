import EmailOutlined from '@mui/icons-material/EmailOutlined';
import PhoneOutlined from '@mui/icons-material/PhoneOutlined';
import PinOutlined from '@mui/icons-material/PinDropOutlined';
import WhatsApp from '@mui/icons-material/WhatsApp';
import { SocialLinks } from '@shared/components/socials';
import contactInformation from '@shared/constants/brujulaInformation.json';
import { Container } from '@shared/layout/container';

export function InformationCard() {
  return (
    <Container bg="bottom-half-grey">
      <h1 className="mb-8 text-secondary text-4xl">Contacto</h1>
      <div
        className="bg-primary text-white p-8 grid max-w-6xl
      gap-x-4 gap-y-4 grid-cols-1 mx-auto rounded-lg text-left
      lg:grid-cols-[max-content_max-content_1fr] items-center
      justify-center lg:justify-start mb-8"
      >
        <WhatsApp />
        <h2 className="text-lg lg:px-4">Whatsapp</h2>
        <a
          href={contactInformation.whatsapp}
          className="text-white"
        >
          {contactInformation.phoneNumbers[0]}
        </a>
        <div className="h-[2px] rounded-lg bg-white lg:col-span-3" />
        <PhoneOutlined />
        <h2 className="text-lg lg:px-4">Teléfono</h2>
        <p>
          {contactInformation.phoneNumbers.map((phone) => (
            <>
              {phone} <br />
            </>
          ))}
        </p>
        <div className="h-[2px] rounded-lg bg-white lg:col-span-3" />
        <EmailOutlined />
        <h2 className="text-lg lg:px-4">Correo electrónico</h2>
        <div className="grid grid-cols-[max-content_1fr] gap-x-4">
          {contactInformation.emails.map(({ name, email }) => (
            <>
              <p>{name}</p>
              <a
                href={`mailto:${email}`}
                className="block text-white truncate"
              >
                {email}
              </a>
            </>
          ))}
        </div>
        <div className="h-[2px] rounded-lg bg-white lg:col-span-3" />
        <PinOutlined />
        <h2 className="text-lg lg:px-4">Visítanos</h2>
        <p>{contactInformation.address}</p>
      </div>
      <SocialLinks />
    </Container>
  );
}
