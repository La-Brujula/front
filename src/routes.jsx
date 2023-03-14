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
const DeleteAccountPage = lazy(() => import('./modules/deleteAccount/page'));
const PasswordResetPage = lazy(() =>
  import('./modules/auth/pages/passwordReset')
);

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
      { path: 'cerrar-cuenta', element: <DeleteAccountPage /> },
      {
        path: 'reset-password',
        element: <PasswordResetPage />,
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
