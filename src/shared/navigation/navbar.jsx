import { NavLink } from "react-router-dom";
import { useState } from "react";
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    return setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className="w-full flex justify-between items-center sticky top-0 px-8
        py-2 bg-blue text-primary z-10"
      >
        <NavLink to="/">
          <img
            src="./Logotipo.svg"
            alt="La Brújula Audiovisual"
            className="h-16"
          />
        </NavLink>
        <div>
          <button
            onClick={toggleOpen}
            className="flex flex-col
                gap-1 items-end cursor-pointer bg-transparent z-10"
          >
            <div className="h-1 w-8 rounded-md bg-primary" />
            <div className="h-1 w-6 rounded-md bg-primary" />
            <div className="h-1 w-8 rounded-md bg-primary" />
          </button>
          <nav
            className={[
              isOpen
                ? "opacity-1 translate-x-0"
                : "opacity-0 translate-x-64 pointer-events-none",
              "¡transition-all duration-300 fixed w-full max-w-md",
              "right-0 px-16 py-4 top-0 h-screen bg-blue flex",
              "flex-col gap-4 z-10 !text-white max-h-[100vh] overflow-y-auto",
            ].join(" ")}
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
              to="/iniciar-sesion"
              className="font-bold leading-relaxed text-white"
            >
              Iniciar Sesión
            </NavLink>
            <NavLink
              onClick={() => toggleOpen()}
              to="/crear-usuario"
              className="font-bold leading-relaxed text-white"
            >
              Crear Usuario
            </NavLink>
            <NavLink
              onClick={() => toggleOpen()}
              to="/"
              className="font-bold leading-relaxed text-white"
            >
              Inicio
            </NavLink>
            <NavLink
              onClick={() => toggleOpen()}
              to="/perfil"
              className="font-bold leading-relaxed text-white"
            >
              Mi Usuaio
            </NavLink>
            <NavLink
              onClick={() => toggleOpen()}
              to="/buscar"
              className="font-bold leading-relaxed text-white"
            >
              Buscador
            </NavLink>
            <NavLink
              onClick={() => toggleOpen()}
              to="/guias"
              className="font-bold leading-relaxed text-white"
            >
              Guías en PDF
            </NavLink>
            <NavLink
              onClick={() => toggleOpen()}
              to="/nosotros"
              className="font-bold leading-relaxed text-white"
            >
              Nosotros
            </NavLink>
            <NavLink
              onClick={() => toggleOpen()}
              to="/contacto"
              className="font-bold leading-relaxed text-white"
            >
              Contacto
            </NavLink>
            <NavLink
              onClick={() => toggleOpen()}
              to="/cerrar-sesion"
              className="font-bold leading-relaxed text-white block mt-6"
            >
              Cerrar Sesión
            </NavLink>
          </nav>
        </div>
      </div>
      <div
        className={`${
          isOpen
            ? "opacity-100 left-0"
            : "opacity-0 left-100 pointer-events-none"
        } transition-all
        duration-300 fixed top-0 h-screen w-full left-0 bg-white
        bg-opacity-60 z-0 backdrop-blur-sm`}
        onClick={toggleOpen}
      />
    </>
  );
};
