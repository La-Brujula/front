import IMDB from '@/shared/icons/imdb';
import TikTok from '@/shared/icons/tiktok';
import Vimeo from '@/shared/icons/vimeo';
import EmailOutlined from '@mui/icons-material/EmailOutlined';
import FacebookOutlined from '@mui/icons-material/FacebookOutlined';
import Instagram from '@mui/icons-material/Instagram';
import LinkOutlined from '@mui/icons-material/LinkOutlined';
import Linkedin from '@mui/icons-material/LinkedIn';
import PhoneOutlined from '@mui/icons-material/PhoneOutlined';
import WhatsApp from '@mui/icons-material/WhatsApp';
import Twitter from '@mui/icons-material/X';
import YouTube from '@mui/icons-material/YouTube';
import { IBackendProfile } from '@/shared/types/user';
import { useTranslation } from 'react-i18next';

export const ContactSection = ({ user }: { user: IBackendProfile }) => {
  const { t } = useTranslation('profile');
  return (
    <div
      className="grid grid-cols-[max-content_1fr] max-w-md
      text-left gap-4 mx-auto xl:mx-0 items-center gap-x-6 overflow-hidden"
    >
      <h3>{t('Contacto')}</h3>
      {!!user.phoneNumbers &&
        user.phoneNumbers.length > 0 &&
        user.phoneNumbers.map((phoneNumber) => (
          <div
            className="grid grid-cols-subgrid col-span-2"
            key={phoneNumber}
          >
            <h3>
              <PhoneOutlined />
            </h3>
            <div className="w-full">
              <a
                target="_blank"
                className="truncate block w-full"
                href={'tel:' + phoneNumber}
              >
                {phoneNumber}
              </a>
            </div>
          </div>
        ))}
      {(user.type != 'moral'
        ? [user.primaryEmail, user.secondaryEmails]
        : user.secondaryEmails !== undefined &&
            user.secondaryEmails[0] !== undefined
          ? user.secondaryEmails
          : [user.primaryEmail]
      )
        .flat()
        .map((email: string | undefined) =>
          email !== undefined ? (
            <div
              className="grid grid-cols-subgrid col-span-2"
              key={email}
            >
              <h3>
                <EmailOutlined />
              </h3>
              <a
                target="_blank"
                className="truncate block w-full"
                href={'mailto:' + email}
              >
                {email}
              </a>
            </div>
          ) : null
        )}
      {!!user.externalLinks &&
        user.externalLinks.map((link) => (
          <div
            className="grid grid-cols-subgrid col-span-full"
            key={link}
          >
            <h3>
              <LinkOutlined />
            </h3>
            <a
              target="_blank"
              className="truncate block w-full"
              href={link}
            >
              {link}
            </a>
          </div>
        ))}
      {!!user.whatsapp && (
        <>
          <h3>
            <WhatsApp />
          </h3>
          <p>{user.whatsapp}</p>
        </>
      )}
      {!!user.imdb && (
        <>
          <h3>
            <IMDB />
          </h3>
          <a
            target="_blank"
            className="truncate block w-full"
            href={user.imdb}
          >
            {user.imdb}
          </a>
        </>
      )}
      {!!user.facebook && (
        <>
          <h3>
            <FacebookOutlined />
          </h3>
          <a
            target="_blank"
            className="truncate block w-full"
            href={user.facebook}
          >
            {user.facebook}
          </a>
        </>
      )}
      {!!user.instagram && (
        <>
          <h3>
            <Instagram />
          </h3>
          <a
            target="_blank"
            className="truncate block w-full"
            href={user.instagram}
          >
            {user.instagram}
          </a>
        </>
      )}
      {!!user.vimeo && (
        <>
          <h3>
            <Vimeo />
          </h3>
          <a
            target="_blank"
            className="truncate block w-full"
            href={user.vimeo}
          >
            {user.vimeo}
          </a>
        </>
      )}
      {!!user.youtube && (
        <>
          <h3>
            <YouTube />
          </h3>
          <a
            target="_blank"
            className="truncate block w-full"
            href={user.youtube}
          >
            {user.youtube}
          </a>
        </>
      )}
      {!!user.linkedin && (
        <>
          <Linkedin />
          <a
            target="_blank"
            className="truncate block w-full"
            href={user.linkedin}
          >
            {user.linkedin}
          </a>
        </>
      )}
      {!!user.twitter && (
        <>
          <h3>
            <Twitter />
          </h3>
          <a
            target="_blank"
            className="truncate block w-full"
            href={user.twitter}
          >
            {user.twitter}
          </a>
        </>
      )}
      {!!user.tiktok && (
        <>
          <h3>
            <TikTok />
          </h3>
          <a
            target="_blank"
            className="truncate block w-full"
            href={user.tiktok}
          >
            {user.tiktok}
          </a>
        </>
      )}
    </div>
  );
};
