import { CloseOutlined } from '@mui/icons-material';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export function AnnouncementBanner(props: { closeBanner: Function }) {
  const { t } = useTranslation('announcements');
  return (
    <Link
      to="/announcements"
      resetScroll
      className="py-2 px-12 flex justify-center bg-secondary text-white relative"
    >
      <div className="max-w-xl w-full text-center">
        <h2 className="text-lg">{t('En La Brújula seguimos construyendo!')}</h2>
        <p>{t('Conoce lo nuevo que tenemos para ti')}</p>
      </div>
      <button
        onClick={(ev) => {
          props.closeBanner();
          ev.preventDefault();
        }}
        className="absolute right-4 bg-transparent p-0 top-1/2 -translate-y-1/2 transform"
      >
        <CloseOutlined fontSize="medium" />
      </button>
    </Link>
  );
}
