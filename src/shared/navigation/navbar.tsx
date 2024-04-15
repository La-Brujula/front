import PersonOutline from '@mui/icons-material/PersonOutline';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../providers/authProvider';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('navigation');

  const { isLoggedIn, account } = useAuth(['isLoggedIn', 'account']);

  const toggleOpen = () => {
    return setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className="w-full flex justify-between items-center sticky top-0 px-8
        py-2 bg-primary text-white z-50"
      >
        <Link
          to="/"
          className="grow text-white"
        >
          <img
            src={import.meta.env.BASE_URL + 'img/LogoWhite.svg'}
            alt="La Brújula Audiovisual"
            className="h-20"
          />
        </Link>
        <div className="hidden md:flex grow flex-row gap-8 justify-end mr-8">
          {!isLoggedIn ? (
            <Link
              to="/auth/login"
              className="font-bold text-white"
            >
              {t('login')}
            </Link>
          ) : (
            <Link
              to="/profile/$userId"
              params={{ userId: account!.ProfileId }}
              className="text-white order-last"
            >
              <PersonOutline />
            </Link>
          )}
          <Link
            to="/search"
            className="font-bold text-white"
          >
            {t('search')}
          </Link>
          <Link
            to="/about"
            className="font-bold text-white"
          >
            {t('aboutUs')}
          </Link>
        </div>
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
                  className="font-bold leading-relaxed text-white"
                >
                  {t('createUser')}
                </Link>
              </>
            ) : (
              <Link
                onClick={() => toggleOpen()}
                to="/profile/$userId"
                params={{ userId: account!.ProfileId }}
                className="font-bold leading-relaxed text-white"
              >
                {t('myUser')}
              </Link>
            )}
            <Link
              onClick={() => toggleOpen()}
              to="/search"
              className="font-bold leading-relaxed text-white"
            >
              {t('search')}
            </Link>
            <Link
              onClick={() => toggleOpen()}
              to="/guides"
              className="font-bold leading-relaxed text-white"
            >
              {t('La Brújula en PDF')}
            </Link>
            <Link
              onClick={() => toggleOpen()}
              to="/about"
              className="font-bold leading-relaxed text-white"
            >
              {t('aboutUs')}
            </Link>
            <a
              onClick={() => toggleOpen()}
              href={import.meta.env.BASE_URL + 'pdf/privacy.pdf'}
              className="font-bold leading-relaxed text-white"
            >
              {t('privacyH')}
            </a>
            <Link
              onClick={() => toggleOpen()}
              to="/contact"
              className="font-bold leading-relaxed text-white"
            >
              {t('contact')}
            </Link>
            {isLoggedIn && (
              <Link
                onClick={() => toggleOpen()}
                to="/auth/logout"
                className="font-bold leading-relaxed text-white block mt-6"
              >
                {t('logout')}
              </Link>
            )}
          </nav>
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
