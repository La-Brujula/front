import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';

const LoginPage = lazy(() => import('@modules/auth/pages/login'));
const SignupRouter = lazy(() => import('@modules/auth/router'));
const LandingPage = lazy(() => import('@modules/landing/pages/landing'));
const ProfileRouter = lazy(() => import('@modules/profile/router'));
const SearchRouter = lazy(() => import('@modules/search/router'));
const LogoutPage = lazy(() => import('@modules/auth/pages/logout'));
const ContactPage = lazy(() => import('./modules/contact/page'));
const AboutUsPage = lazy(() => import('./modules/about/page'));
const PDFGuidesPage = lazy(() => import('./modules/guides/page'));

export const AppRouter = createBrowserRouter([
  {
    base: import.meta.env.BASE_URL,
    element: <App />,
    children: [
      { path: '', element: <LandingPage /> },
      { path: 'iniciar-sesion', element: <LoginPage /> },
      { path: 'crear-usuario/*', element: <SignupRouter /> },
      { path: 'usuarios/*', element: <ProfileRouter /> },
      { path: 'buscar/*', element: <SearchRouter /> },
      { path: 'guias', element: <PDFGuidesPage /> },
      { path: 'quienes-somos', element: <AboutUsPage /> },
      { path: 'contacto', element: <ContactPage /> },
      { path: 'cerrar-sesion', element: <LogoutPage /> },
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
