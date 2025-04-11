import { useCallback, useEffect, useState } from 'react';

import { Link, useRouterState } from '@tanstack/react-router';
import { UserIcon, XIcon } from 'lucide-react';
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
      <div className="sticky top-0 z-50">
        {bannerOpen && <AnnouncementBanner closeBanner={closeBanner} />}
        <div className="flex w-full items-center justify-between bg-primary px-8 py-2 text-white">
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
          <div className="mr-8 hidden grow flex-row justify-end gap-8 md:flex">
            {!isLoggedIn ? (
              <Link
                resetScroll
                to="/auth/login"
                search={{ redirect: location.pathname }}
                className="font-bold text-white"
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
              className="font-bold text-white"
            >
              {t('search')}
            </Link>
            {isLoggedIn && (
              <Link
                to="/jobs"
                resetScroll
                className="font-bold leading-relaxed text-white"
              >
                {t('jobs')}
              </Link>
            )}
          </div>
          <LocalizationMenu />
          <div className="z-100">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleOpen}
              className="z-10 flex cursor-pointer flex-col items-end gap-1 bg-transparent"
            >
              <div className="h-1 w-8 rounded-md bg-white" />
              <div className="h-1 w-6 rounded-md bg-white" />
              <div className="h-1 w-8 rounded-md bg-white" />
            </Button>
            <nav
              className={[
                isOpen
                  ? 'opacity-1 translate-x-0'
                  : 'pointer-events-none translate-x-64 opacity-0',
                '¡transition-all fixed w-full max-w-md duration-300',
                'z-100 right-0 top-0 flex h-screen bg-blue px-16 py-4',
                'z-10 max-h-[100vh] flex-col gap-4 overflow-y-auto !text-white',
              ].join(' ')}
            >
              <Button
                onClick={toggleOpen}
                size="icon"
                variant="ghost"
                className="z-10 flex cursor-pointer flex-col items-end gap-1 self-end bg-transparent"
              >
                <XIcon />
              </Button>
              <Link
                onClick={() => toggleOpen()}
                to="/"
                resetScroll
                className="font-bold leading-relaxed text-white"
              >
                {t('home')}
              </Link>
              {!isLoggedIn ? (
                <>
                  <Link
                    onClick={() => toggleOpen()}
                    to="/auth/login"
                    search={{ redirect: location.pathname }}
                    className="font-bold leading-relaxed text-white"
                  >
                    {t('login')}
                  </Link>
                  <Link
                    onClick={() => toggleOpen()}
                    to="/auth/signup"
                    resetScroll
                    className="font-bold leading-relaxed text-white"
                  >
                    {t('createUser')}
                  </Link>
                </>
              ) : (
                <Link
                  onClick={() => toggleOpen()}
                  to="/profile/$userId"
                  resetScroll
                  params={{ userId: account!.ProfileId }}
                  className="font-bold leading-relaxed text-white"
                >
                  {t('myUser')}
                </Link>
              )}
              <Link
                onClick={() => toggleOpen()}
                to="/search"
                search={{ country: 'MX' }}
                resetScroll
                className="font-bold leading-relaxed text-white"
              >
                {t('search')}
              </Link>
              {isLoggedIn && (
                <Link
                  onClick={() => toggleOpen()}
                  to="/jobs"
                  resetScroll
                  className="font-bold leading-relaxed text-white"
                >
                  {t('jobs')}
                </Link>
              )}
              <Link
                onClick={() => toggleOpen()}
                to="/guides"
                resetScroll
                className="font-bold leading-relaxed text-white"
              >
                {t('La Brújula en PDF')}
              </Link>
              <Link
                onClick={() => toggleOpen()}
                to="/about"
                resetScroll
                className="font-bold leading-relaxed text-white"
              >
                {t('aboutUs')}
              </Link>
              <Link
                to="/announcements"
                resetScroll
                className="font-bold text-white"
              >
                {t('announcements')}
              </Link>
              <Link
                onClick={() => toggleOpen()}
                to="/privacy"
                className="font-bold leading-relaxed text-white"
              >
                {t('privacyH')}
              </Link>
              <Link
                onClick={() => toggleOpen()}
                to="/contact"
                resetScroll
                className="font-bold leading-relaxed text-white"
              >
                {t('contact')}
              </Link>
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
              {isLoggedIn && (
                <>
                  <hr />
                  <Link
                    onClick={() => toggleOpen()}
                    to="/auth/logout"
                    resetScroll
                    className="mt-6 block font-bold leading-relaxed text-white"
                  >
                    {t('logout')}
                    <hr />
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
      <div
        className={`${
          isOpen
            ? 'left-0 opacity-100'
            : 'left-100 pointer-events-none opacity-0'
        } fixed left-0 top-0 z-10 h-screen w-full bg-white bg-opacity-20 backdrop-blur-sm transition-all duration-300`}
        onClick={toggleOpen}
      />
    </>
  );
};
