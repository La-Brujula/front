import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import LocalizationMenu from '../components/localizationMenu';
import { useTranslation } from 'react-i18next';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('navigation');

  const toggleOpen = () => {
    return setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className="w-full flex justify-between items-center sticky top-0 px-8
        py-2 bg-primary text-white z-10"
      >
        <NavLink to={import.meta.env.BASE_URL} className="grow text-white">
          <img
            src={import.meta.env.BASE_URL + 'img/LogoWhite.svg'}
            alt="La Brújula Audiovisual"
            className="h-20"
          />
        </NavLink>
        <div className="hidden md:flex grow flex-row gap-8 justify-end mr-8">
          <NavLink to="iniciar-sesion" className="font-bold text-white">{t('login')}</NavLink>
          <NavLink to="search" className="font-bold text-white">{t('search')}</NavLink>
          <NavLink to="noticias" className="font-bold text-white">{t('news')}</NavLink>
        </div>
        <div>
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
              'right-0 px-16 py-4 top-0 h-screen bg-blue flex',
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
            <NavLink
              onClick={() => toggleOpen()}
              to={import.meta.env.BASE_URL + "iniciar-sesion"}
              className="font-bold leading-relaxed text-white"
            >
              {t('login')}
            </NavLink>
            <NavLink
              onClick={() => toggleOpen()}
              to={import.meta.env.BASE_URL + "crear-usuario"}
              className="font-bold leading-relaxed text-white"
            >
              {t('createUser')}
            </NavLink>
            <NavLink
              onClick={() => toggleOpen()}
              to={import.meta.env.BASE_URL}
              className="font-bold leading-relaxed text-white"
            >
              {t('home')}
            </NavLink>
            <NavLink
              onClick={() => toggleOpen()}
              to={import.meta.env.BASE_URL + "perfil"}
              className="font-bold leading-relaxed text-white"
            >
              {t('myUser')}
            </NavLink>
            <NavLink
              onClick={() => toggleOpen()}
              to={import.meta.env.BASE_URL + "buscar"}
              className="font-bold leading-relaxed text-white"
            >
              {t('search')}
            </NavLink>
            <NavLink
              onClick={() => toggleOpen()}
              to={import.meta.env.BASE_URL + "guias"}
              className="font-bold leading-relaxed text-white"
            >
              {t('pdfGuides')}
            </NavLink>
            <NavLink
              onClick={() => toggleOpen()}
              to={import.meta.env.BASE_URL + "nosotros"}
              className="font-bold leading-relaxed text-white"
            >
              {t('aboutUs')}
            </NavLink>
            <NavLink
              onClick={() => toggleOpen()}
              to={import.meta.env.BASE_URL + "contacto"}
              className="font-bold leading-relaxed text-white"
            >
              {t('contact')}
            </NavLink>
            <NavLink
              onClick={() => toggleOpen()}
              to={import.meta.env.BASE_URL + "cerrar-sesion"}
              className="font-bold leading-relaxed text-white block mt-6"
            >
              {t('logout')}
            </NavLink>
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
        duration-300 fixed top-0 h-screen w-full left-0 bg-white
        bg-opacity-60 z-0 backdrop-blur-sm`}
        onClick={toggleOpen}
      />
    </>
  );
};
