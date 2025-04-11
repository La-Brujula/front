import {
  FacebookIcon,
  InstagramIcon,
  LinkIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
  TwitterIcon,
  YoutubeIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import IMDB from '@/shared/icons/imdb';
import TikTok from '@/shared/icons/tiktok';
import Vimeo from '@/shared/icons/vimeo';
import WhatsApp from '@/shared/icons/whatsapp';
import { IBackendProfile } from '@/shared/types/user';

export const ContactSection = ({ user }: { user: IBackendProfile }) => {
  const { t } = useTranslation('profile');
  return (
    <div className="mx-auto grid max-w-md grid-cols-[max-content_1fr] items-center gap-4 gap-x-6 overflow-hidden text-left xl:mx-0">
      <h3>{t('Contacto')}</h3>
      {!!user.phoneNumbers &&
        user.phoneNumbers.length > 0 &&
        user.phoneNumbers.map((phoneNumber) => (
          <div
            className="col-span-2 grid grid-cols-subgrid"
            key={phoneNumber}
          >
            <h3>
              <PhoneIcon />
            </h3>
            <div className="w-full">
              <a
                target="_blank"
                className="block w-full truncate"
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
              className="col-span-2 grid grid-cols-subgrid"
              key={email}
            >
              <h3>
                <MailIcon />
              </h3>
              <a
                target="_blank"
                className="block w-full truncate"
                href={'mailto:' + email}
              >
                {email}
              </a>
            </div>
          ) : null
        )}
      {!!user.externalLinks &&
        user.externalLinks.map(
          (link) =>
            !!link && (
              <div
                className="col-span-full grid grid-cols-subgrid"
                key={link}
              >
                <h3>
                  <LinkIcon />
                </h3>
                <a
                  target="_blank"
                  className="block w-full truncate"
                  href={link}
                >
                  {link}
                </a>
              </div>
            )
        )}
      {!!user.whatsapp && (
        <>
          <h3>
            <WhatsApp />
          </h3>
          <a
            target="_blank"
            href={`https://wa.me/${user.whatsapp.replace(/[ +(){}-]/g, '')}`}
          >
            <p>{user.whatsapp}</p>
          </a>
        </>
      )}
      {!!user.imdb && (
        <>
          <h3>
            <IMDB />
          </h3>
          <a
            target="_blank"
            className="block w-full truncate"
            href={user.imdb}
          >
            {user.imdb}
          </a>
        </>
      )}
      {!!user.facebook && (
        <>
          <h3>
            <FacebookIcon />
          </h3>
          <a
            target="_blank"
            className="block w-full truncate"
            href={user.facebook}
          >
            {user.facebook}
          </a>
        </>
      )}
      {!!user.instagram && (
        <>
          <h3>
            <InstagramIcon />
          </h3>
          <a
            target="_blank"
            className="block w-full truncate"
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
            className="block w-full truncate"
            href={user.vimeo}
          >
            {user.vimeo}
          </a>
        </>
      )}
      {!!user.youtube && (
        <>
          <h3>
            <YoutubeIcon />
          </h3>
          <a
            target="_blank"
            className="block w-full truncate"
            href={user.youtube}
          >
            {user.youtube}
          </a>
        </>
      )}
      {!!user.linkedin && (
        <>
          <LinkedinIcon />
          <a
            target="_blank"
            className="block w-full truncate"
            href={user.linkedin}
          >
            {user.linkedin}
          </a>
        </>
      )}
      {!!user.twitter && (
        <>
          <h3>
            <TwitterIcon />
          </h3>
          <a
            target="_blank"
            className="block w-full truncate"
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
            className="block w-full truncate"
            href={user.tiktok}
          >
            {user.tiktok}
          </a>
        </>
      )}
    </div>
  );
};
