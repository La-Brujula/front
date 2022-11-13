import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';

const LoginPage = lazy(() => import('@modules/auth/pages/login'));
const SignupRouter = lazy(() => import('@modules/auth/router'));
const LandingPage = lazy(() => import('@modules/landing/pages/landing'));
const ProfileRouter = lazy(() => import('@modules/profile/router'));
const SearchRouter = lazy(() => import('@modules/search/router'));

export const AppRouter = createBrowserRouter([
  {
    base: import.meta.env.BASE_URL,
    element: <App />,
    children: [
      { path: '', element: <LandingPage /> },
      { path: 'iniciar-sesion', element: <LoginPage /> },
      { path: 'crear-usuario/*', element: <SignupRouter /> },
      { path: 'perfil/*', element: <ProfileRouter /> },
      { path: 'buscar/*', element: <SearchRouter /> },
      { path: 'guias', element: <h1>Guias</h1> },
      { path: 'nosotros', element: <h1>Nosostros</h1> },
      { path: 'contacto', element: <h1>Contacto</h1> },
      { path: 'cerrar-sesion', element: <h1>Cerrar sesión</h1> },
      { path: 'aviso-privacidad', element: <h1>Aviso Privacidad</h1> },
      {
        path: 'reiniciar-contraseña',
        element: <h1>Reiniciar Contraseña</h1>,
      },
      {
        path: '*',
        element: (
          <h1 className="leading-[25vh] text-center">
            uwu
            <br /> <span className="text-xl">no ta</span>
          </h1>
        ),
      },
    ],
  },
]);
