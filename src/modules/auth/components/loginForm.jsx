import { NavLink } from "react-router-dom";
export const LoginForm = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-baseline gap-8 justify-center">
        <div className="flex flex-col gap-2 items-start">
          <label htmlFor="email" className="block">
            Correo
          </label>
          <input
            id="email"
            type="email"
            placeholder="Correo"
            autocomplete="email"
          />
        </div>
        <div className="flex flex-col gap-2 items-start">
          <label htmlFor="email">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            autocomplete="password"
          />
        </div>
      </div>
      <button className="max-w-xs mx-auto mt-8 bg-primary">
        Iniciar Sesión
      </button>
      <div className="flex flex-col gap-2 mt-4 text-primary">
        <NavLink to="/crear-usuario">Crear usuario</NavLink>
        <NavLink to="/reiniciar-contraseña">Olvide mi contraseña</NavLink>
      </div>
    </>
  );
};
