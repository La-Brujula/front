import IMDB from '@shared/icons/imdb';
import TikTok from '@shared/icons/tiktok';
import Vimeo from '@shared/icons/vimeo';
import EmailOutlined from '@mui/icons-material/EmailOutlined';
import FacebookOutlined from '@mui/icons-material/FacebookOutlined';
import Instagram from '@mui/icons-material/Instagram';
import LinkOutlined from '@mui/icons-material/LinkOutlined';
import Linkedin from '@mui/icons-material/LinkedIn';
import PhoneOutlined from '@mui/icons-material/PhoneOutlined';
import WhatsApp from '@mui/icons-material/WhatsApp';
import Twitter from '@mui/icons-material/X';
import YouTube from '@mui/icons-material/YouTube';
import { IFirebaseProfile } from '@/shared/types/user';

export const ContactSection = ({ user }: { user: IFirebaseProfile }) => {
  return (
    <div
      className="grid grid-cols-[max-content_1fr] max-w-md
      text-left gap-4 mx-auto xl:mx-0 items-center gap-x-6 overflow-hidden"
    >
      {!!user.phone && (
        <>
          <h3>
            <PhoneOutlined />
          </h3>
          <div className="w-full">
            <a
              target="_blank"
              className="truncate block w-full"
              href={'tel:' + user.phone}
            >
              {user.phone}
            </a>
          </div>
        </>
      )}
      {!!user.altPhone && (
        <>
          <h3>
            <PhoneOutlined />
          </h3>
          <div className="w-full">
            <a
              target="_blank"
              className="truncate block w-full"
              href={'tel:' + user.altPhone}
            >
              {user.altPhone}
            </a>
          </div>
        </>
      )}
      {!!user.altPhone2 && (
        <>
          <h3>
            <PhoneOutlined />
          </h3>
          <div className="w-full">
            <a
              target="_blank"
              className="truncate block w-full"
              href={'tel:' + user.altPhone2}
            >
              {user.altPhone2}
            </a>
          </div>
        </>
      )}
      {!!user.email && !(user.type == 'moral' && user.altEmail) && (
        <>
          <h3>
            <EmailOutlined />
          </h3>
          <a
            target="_blank"
            className="truncate block w-full"
            href={'mailto:' + user.email}
          >
            {user.email}
          </a>
        </>
      )}
      {!!user.altEmail && (
        <>
          <h3>
            <EmailOutlined />
          </h3>
          <div className="w-full">
            <a
              target="_blank"
              className="truncate block w-full"
              href={'mailto:' + user.altEmail}
            >
              {user.altEmail}
            </a>
          </div>
        </>
      )}
      {!!user.altEmail2 && (
        <>
          <h3>
            <EmailOutlined />
          </h3>
          <div className="w-full">
            <a
              target="_blank"
              className="truncate block w-full"
              href={'mailto:' + user.altEmail2}
            >
              {user.altEmail2}
            </a>
          </div>
        </>
      )}
      {!!user.website && (
        <>
          <h3>
            <LinkOutlined />
          </h3>
          <a
            target="_blank"
            className="truncate block w-full"
            href={user.website}
          >
            {user.website}
          </a>
        </>
      )}
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