import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorHandler from './shared/navigation/errorHandler';

const LoginPage = lazy(() => import('@modules/auth/pages/login'));
const SignupRouter = lazy(() => import('@modules/auth/router'));
const LandingPage = lazy(() => import('@modules/landing/pages/landing'));
const ProfileRouter = lazy(() => import('@modules/profile/router'));
const SearchRouter = lazy(() => import('@modules/search/router'));
const LogoutPage = lazy(() => import('@modules/auth/pages/logout'));
const ContactPage = lazy(() => import('./modules/contact/page'));
const AboutUsPage = lazy(() => import('./modules/about/page'));
const PDFGuidesPage = lazy(() => import('./modules/guides/page'));
const TermsAndConditionsPage = lazy(
  () => import('./modules/termsAndConditions/page'),
);
const DeleteAccountPage = lazy(() => import('./modules/deleteAccount/page'));
const PasswordResetPage = lazy(
  () => import('./modules/auth/pages/passwordReset'),
);
const DataPage = lazy(() => import('@modules/data/page'));
const Page404 = lazy(() => import('@/shared/navigation/page404'));

export const AppRouter = createBrowserRouter(
  [
    {
      element: <App />,
      errorElement: <ErrorHandler />,
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
        { path: 'terminos-y-condiciones', element: <TermsAndConditionsPage /> },
        {
          path: 'reset-password',
          element: <PasswordResetPage />,
        },
        { path: 'datos', element: <DataPage /> },
        { path: '*', element: <Page404 /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);
