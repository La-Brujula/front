import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import LocalizationMenu from '../components/localizationMenu';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@shared/context/firebaseContext';
import PersonOutline from '@mui/icons-material/PersonOutline';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('navigation');

  const { isLoggedIn } = useAuth();

  const toggleOpen = () => {
    return setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className="w-full flex justify-between items-center sticky top-0 px-8
        py-2 bg-primary text-white z-10"
      >
        <NavLink to="/" className="grow text-white">
          <img
            src={import.meta.env.BASE_URL + 'img/LogoWhite.svg'}
            alt="La Brújula Audiovisual"
            className="h-20"
          />
        </NavLink>
        <div className="hidden md:flex grow flex-row gap-8 justify-end mr-8">
          {!isLoggedIn() ? (
            <NavLink to="/iniciar-sesion" className="font-bold text-white">
              {t('login')}
            </NavLink>
          ) : (
            <NavLink to="/perfil" className="text-white order-last">
              <PersonOutline />
            </NavLink>
          )}
          <NavLink to="/buscar" className="font-bold text-white">
            {t('search')}
          </NavLink>
          <NavLink to="/noticias" className="font-bold text-white">
            {t('Noticias')}
          </NavLink>
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
            {!isLoggedIn() ? (
              <>
                <NavLink
                  onClick={() => toggleOpen()}
                  to="/iniciar-sesion"
                  className="font-bold leading-relaxed text-white"
                >
                  {t('login')}
                </NavLink>
                <NavLink
                  onClick={() => toggleOpen()}
                  to="/crear-usuario"
                  className="font-bold leading-relaxed text-white"
                >
                  {t('createUser')}
                </NavLink>
              </>
            ) : (
              <NavLink
                onClick={() => toggleOpen()}
                to="/perfil"
                className="font-bold leading-relaxed text-white"
              >
                {t('myUser')}
              </NavLink>
            )}
            <NavLink
              onClick={() => toggleOpen()}
              to="/"
              className="font-bold leading-relaxed text-white"
            >
              {t('home')}
            </NavLink>
            <NavLink
              onClick={() => toggleOpen()}
              to="/buscar"
              className="font-bold leading-relaxed text-white"
            >
              {t('search')}
            </NavLink>
            <NavLink
              onClick={() => toggleOpen()}
              to="/guias"
              className="font-bold leading-relaxed text-white"
            >
              {t('pdfGuides')}
            </NavLink>
            <NavLink
              onClick={() => toggleOpen()}
              to="/nosotros"
              className="font-bold leading-relaxed text-white"
            >
              {t('aboutUs')}
            </NavLink>
            <NavLink
              onClick={() => toggleOpen()}
              to="/contacto"
              className="font-bold leading-relaxed text-white"
            >
              {t('contact')}
            </NavLink>
            {isLoggedIn() && (
              <NavLink
                onClick={() => toggleOpen()}
                to="/cerrar-sesion"
                className="font-bold leading-relaxed text-white block mt-6"
              >
                {t('logout')}
              </NavLink>
            )}
            <LocalizationMenu />
          </nav>
        </div>
      </div>
      <div
        className={`${
          isOpen
            ? 'opacity-100 left-0'
            : 'opacity-0 left-100 pointer-events-none'
        } transition-all
        duration-300 fixed top-4 h-screen w-full left-0 bg-white
        bg-opacity-20 z-0 backdrop-blur-sm`}
        onClick={toggleOpen}
      />
    </>
  );
};
