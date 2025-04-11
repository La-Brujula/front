import { Link } from '@tanstack/react-router';
import { XIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';

export function AnnouncementBanner(props: { closeBanner: Function }) {
  const { t } = useTranslation('announcements');
  return (
    <Link
      to="/announcements"
      resetScroll
      className="relative flex justify-center bg-secondary px-12 py-2 text-white"
    >
      <div className="w-full max-w-xl text-center">
        <h2 className="text-lg">{t('En La Brújula seguimos construyendo!')}</h2>
        <p>{t('Conoce lo nuevo que tenemos para ti')}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={(ev) => {
          props.closeBanner();
          ev.preventDefault();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 transform bg-transparent p-0"
      >
        <XIcon />
      </Button>
    </Link>
  );
}
