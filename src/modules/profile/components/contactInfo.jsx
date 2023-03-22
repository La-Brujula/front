import FacebookOutlined from '@mui/icons-material/FacebookOutlined';
import EmailOutlined from '@mui/icons-material/EmailOutlined';
import PhoneOutlined from '@mui/icons-material/PhoneOutlined';
import WhatsApp from '@mui/icons-material/WhatsApp';
import Instagram from '@mui/icons-material/Instagram';
import Twitter from '@mui/icons-material/Twitter';
import YouTube from '@mui/icons-material/YouTube';

export const ContactSection = ({ user }) => {
  return (
    <div
      className="grid grid-cols-[max-content_max-content] max-w-md
      text-left gap-4 mx-auto xl:mx-0 items-center gap-x-6"
    >
      {!!user.phone && (
        <>
          <h3>
            <PhoneOutlined />
          </h3>
          <a className='truncate' href={'tel:' + user.phone}>{user.phone}</a>
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
      {!!user.email && (
        <>
          <h3>
            <EmailOutlined />
          </h3>
          <a className='truncate' href={'mailto:' + user.email}>{user.email}</a>
        </>
      )}
      {!!user.imdb && (
        <>
          <h3>IMDB</h3>
          <a className='truncate' href={'https://www.imdb.com/name/' + user.imdb}>{user.imdb}</a>
        </>
      )}
      {!!user.facebook && (
        <>
          <h3>
            <FacebookOutlined />
          </h3>
          <a className='truncate' href={'https://www.facebook.com/' + user.facebook}>{user.facebook}</a>
        </>
      )}
      {!!user.instagram && (
        <>
          <h3>
            <Instagram />
          </h3>
          <a className='truncate' href={'https://www.instagram.com/' + user.instagram}>{user.instagram}</a>
        </>
      )}
      {!!user.vimeo && (
        <>
          <h3>Vimeo</h3>
          <a className='truncate' href={'https://vimeo.com/' + user.vimeo}>{user.vimeo}</a>
        </>
      )}
      {!!user.youtube && (
        <>
          <h3>
            <YouTube />
          </h3>
          <a className='truncate' href={'https://youtube.com/' + user.youtube}>{user.youtube}</a>
        </>
      )}
      {!!user.linkedin && (
        <>
          <h3>LinkedIn</h3>
          <a className='truncate' href={'https://www.linkedin.com/in/' + user.linkedin}>{user.linkedin}</a>
        </>
      )}
      {!!user.twitter && (
        <>
          <h3>
            <Twitter />
          </h3>
          <a className='truncate' href={'https://twitter.com/' + user.twitter}>{user.twitter}</a>
        </>
      )}
      {!!user.tiktok && (
        <>
          <h3>Tiktok</h3>
          <a className='truncate' href={'https://tiktok.com/' + user.tiktok}>{user.tiktok}</a>
        </>
      )}
    </div>
  );
};
