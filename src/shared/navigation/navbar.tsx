import { useCallback, useEffect, useState } from 'react';

import { Link, useRouterState } from '@tanstack/react-router';
import {
  BookOpenTextIcon,
  BriefcaseBusinessIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
  UserPlus,
  XIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';

import LocalizationMenu from '../components/localizationMenu';
import contactInformation from '../constants/brujulaInformation.json';
import { useAuth } from '../providers/authProvider';
import { AnnouncementBanner } from './banner';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(
    localStorage.getItem('banner') !== 'false'
  );
  const { t } = useTranslation('navigation');

  // Typing too deep for tsc
  // @ts-ignore
  const { location } = useRouterState();

  const { isLoggedIn, account } = useAuth(['isLoggedIn', 'account']);

  const toggleOpen = useCallback(() => {
    return setIsOpen((current) => !current);
  }, [setIsOpen]);

  useEffect(() => {
    const localStorageBanner = localStorage.getItem('banner');
    if (localStorageBanner === null) {
      localStorage.setItem('banner', 'true');
    }
    if (localStorageBanner === 'true') {
      setBannerOpen(true);
    }
  }, []);

  const closeBanner = useCallback(() => {
    localStorage.setItem('banner', 'false');
    return setBannerOpen(false);
  }, [setBannerOpen]);

  return (
    <>
      <div className="sticky top-0 z-20">
        {bannerOpen && <AnnouncementBanner closeBanner={closeBanner} />}
        <div className="flex w-full items-center justify-between gap-4 bg-primary px-8 py-2 text-white">
          <Link
            resetScroll
            to="/"
            className="grow text-white"
          >
            <img
              src={import.meta.env.BASE_URL + 'img/LogoWhite.svg'}
              alt="La Brújula Audiovisual"
              className="hidden h-20 md:block"
            />
            <img
              src={import.meta.env.BASE_URL + 'img/BrujulaWhite.svg'}
              alt="La Brújula Audiovisual"
              className="h-16 md:hidden"
            />
          </Link>
          <div className="hidden grow flex-row justify-end gap-4 md:flex">
            {!isLoggedIn ? (
              <Link
                resetScroll
                to="/auth/login"
                search={{ redirect: location.pathname }}
                className="text-white"
              >
                {t('login')}
              </Link>
            ) : (
              <Link
                resetScroll
                to="/profile/$userId"
                params={{ userId: 'me' }}
                className="order-last text-white"
              >
                <UserIcon />
              </Link>
            )}
            <Link
              to="/search"
              search={{ country: 'MX' }}
              resetScroll
              className="text-white"
            >
              {t('search')}
            </Link>
            {isLoggedIn && (
              <Link
                to="/jobs"
                resetScroll
                className="leading-relaxed text-white"
              >
                {t('jobs')}
              </Link>
            )}
          </div>
          <LocalizationMenu />
          <Button
            variant="ghost"
            onClick={toggleOpen}
            className="z-10 flex cursor-pointer flex-col items-end gap-1 bg-transparent"
          >
            <MenuIcon size={64} />
          </Button>
        </div>
      </div>
      <nav
        data-open={isOpen}
        className="¡transition-all z-100 pointer-events-none fixed right-0 top-0 z-30 flex h-screen max-h-[100vh] w-full max-w-xs translate-x-64 flex-col gap-4 overflow-y-auto bg-blue p-8 !text-white opacity-0 duration-300 data-[open=true]:translate-x-0 data-[open=true]:opacity-100"
      >
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleOpen}
          className="z-10 flex cursor-pointer flex-col items-end gap-1 self-end bg-transparent"
        >
          <XIcon size="32" />
        </Button>
        <Link
          to="/"
          resetScroll
          className="flex flex-row gap-4 leading-relaxed text-white"
        >
          <HomeIcon />
          {t('home')}
        </Link>
        <Link
          to="/search"
          search={{ country: 'MX' }}
          resetScroll
          className="flex flex-row gap-4 leading-relaxed text-white"
        >
          <SearchIcon />
          {t('search')}
        </Link>
        {!isLoggedIn ? (
          <>
            <Link
              to="/auth/login"
              search={{ redirect: location.pathname }}
              className="flex flex-row gap-4 leading-relaxed text-white"
            >
              <UserIcon />
              {t('login')}
            </Link>
            <Link
              to="/auth/signup"
              resetScroll
              className="flex flex-row gap-4 leading-relaxed text-white"
            >
              <UserPlus />
              {t('createUser')}
            </Link>
          </>
        ) : (
          <Link
            to="/profile/$userId"
            resetScroll
            params={{ userId: account!.ProfileId }}
            className="flex flex-row gap-4 leading-relaxed text-white"
          >
            <UserIcon />
            {t('myUser')}
          </Link>
        )}

        {isLoggedIn && (
          <Link
            to="/jobs"
            resetScroll
            className="flex flex-row gap-4 leading-relaxed text-white"
          >
            <BriefcaseBusinessIcon />
            {t('jobs')}
          </Link>
        )}
        <Link
          to="/guides"
          resetScroll
          className="flex flex-row gap-4 leading-relaxed text-white"
        >
          <BookOpenTextIcon />
          {t('La Brújula en PDF')}
        </Link>
        {isLoggedIn && (
          <Link
            to="/auth/logout"
            resetScroll
            className="mt-4 flex flex-row gap-4 leading-relaxed text-white"
          >
            <LogOutIcon />
            {t('logout')}
          </Link>
        )}

        <div className="min-h-16 grow"></div>
        <hr />
        <a
          target="_blank"
          href={contactInformation.whatsapp}
          className="flex flex-row items-center gap-4 self-center rounded-full bg-primary px-4 py-2 text-white"
        >
          <img
            src={import.meta.env.BASE_URL + 'img/support.svg'}
            alt="Soporte"
            className="h-10"
          />
          <p className="text-2xl font-bold">Soporte</p>
        </a>
        <Link
          to="/about"
          resetScroll
          className="leading-relaxed text-white"
        >
          {t('aboutUs')}
        </Link>
        <Link
          to="/announcements"
          resetScroll
          className="flex flex-row gap-4 text-white"
        >
          {t('announcements')}
        </Link>
        <Link
          to="/privacy"
          className="flex flex-row gap-4 leading-relaxed text-white"
        >
          {t('privacyH')}
        </Link>
      </nav>
      <div
        data-open={isOpen}
        className="left-100 pointer-events-none fixed left-0 top-24 z-10 h-full w-full bg-white bg-opacity-5 opacity-0 backdrop-blur-md transition-all duration-300 data-[open=true]:pointer-events-auto data-[open=true]:left-0 data-[open=true]:opacity-100"
        onClick={toggleOpen}
      />
    </>
  );
};
