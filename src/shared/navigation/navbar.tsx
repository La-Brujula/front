import PersonOutline from '@mui/icons-material/PersonOutline';
import { Link } from '@tanstack/react-router';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../providers/authProvider';
import { AnnouncementBanner } from './banner';
import LocalizationMenu from '../components/localizationMenu';
import contactInformation from '../constants/brujulaInformation.json';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(
    localStorage.getItem('banner') !== 'false'
  );
  const { t } = useTranslation('navigation');

  const { isLoggedIn, account } = useAuth(['isLoggedIn', 'account']);

  const toggleOpen = useCallback(() => {
    return setIsOpen((current) => !current);
  }, [setIsOpen]);

  useEffect(() => {
    const localStorageBanner = localStorage.getItem('banner');
    if (localStorageBanner === null || localStorageBanner === 'true') {
      setBannerOpen(true);
      localStorage.setItem('banner', 'true');
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
        <div
          className="w-full flex justify-between items-center px-8
        py-2 bg-primary text-white"
        >
          <Link
            resetScroll
            to="/"
            className="grow text-white"
          >
            <img
              src={import.meta.env.BASE_URL + 'img/LogoWhite.svg'}
              alt="La Brújula Audiovisual"
              className="hidden md:block h-20"
            />
            <img
              src={import.meta.env.BASE_URL + 'img/BrujulaWhite.svg'}
              alt="La Brújula Audiovisual"
              className="md:hidden h-16"
            />
          </Link>
          <div className="hidden md:flex grow flex-row gap-8 justify-end mr-8">
            {!isLoggedIn ? (
              <Link
                resetScroll
                to="/auth/login"
                className="font-bold text-white"
              >
                {t('login')}
              </Link>
            ) : (
              <Link
                resetScroll
                to="/profile/$userId"
                params={{ userId: 'me' }}
                className="text-white order-last"
              >
                <PersonOutline />
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
            <button
              onClick={toggleOpen}
              className="flex flex-col
            gap-1 items-end cursor-pointer bg-transparent z-10"
            >
              <div className="h-1 w-8 rounded-md bg-white" />
              <div className="h-1 w-6 rounded-md bg-white" />
              <div className="h-1 w-8 rounded-md bg-white" />
            </button>
            <nav
              className={[
                isOpen
                  ? 'opacity-1 translate-x-0'
                  : 'opacity-0 translate-x-64 pointer-events-none',
                '¡transition-all duration-300 fixed w-full max-w-md',
                'right-0 px-16 py-4 top-0 h-screen bg-blue flex z-100',
                'flex-col gap-4 z-10 !text-white max-h-[100vh] overflow-y-auto',
              ].join(' ')}
            >
              <button
                onClick={toggleOpen}
                className="flex flex-col
              gap-1 items-end cursor-pointer z-10 self-end bg-transparent"
              >
                <div
                  className="self-end rounded-md bg-transparent
                p-2 text-3xl"
                >
                  X
                </div>
              </button>
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
                className="flex flex-row gap-4 items-center self-center px-4 py-2 rounded-full bg-primary text-white"
              >
                <img
                  src={import.meta.env.BASE_URL + 'img/support.svg'}
                  alt="Soporte"
                  className="h-10"
                />
                <p className="font-bold text-2xl">Soporte</p>
              </a>
              {isLoggedIn && (
                <>
                  <hr />
                  <Link
                    onClick={() => toggleOpen()}
                    to="/auth/logout"
                    resetScroll
                    className="font-bold leading-relaxed text-white block mt-6"
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
            ? 'opacity-100 left-0'
            : 'opacity-0 left-100 pointer-events-none'
        } transition-all top-0
        duration-300 fixed h-screen w-full left-0 bg-white
        bg-opacity-20 z-10 backdrop-blur-sm`}
        onClick={toggleOpen}
      />
    </>
  );
};
