import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Signup = lazy(() => import('./pages/signup'));
const SearchBasePage = lazy(() => import('../search/pages/base'));
const BaseStepPage = lazy(() => import('./pages/base'));
const ProfileSummary = lazy(() => import('./pages/summary'));
const BasicInfo = lazy(() => import('./pages/basicInfo'));
const StandoutPage = lazy(() => import('./pages/standOut'));
const ContactPage = lazy(() => import('./pages/contact'));
const CaracteristicasPage = lazy(() => import('./pages/caracteristicas'));
const AreasRegistration = lazy(() => import('./pages/areas'));
const Page404 = lazy(() => import('@/shared/navigation/page404'));

export default () => (
  <Routes>
    <Route
      index
      element={<Signup />}
    />
    <Route
      path=""
      element={<SearchBasePage />}
    >
      <Route
        path="basica"
        element={<BasicInfo />}
      />
      <Route
        path=""
        element={<BaseStepPage />}
      >
        <Route
          path="area"
          element={<AreasRegistration />}
        />
        <Route
          path="destaca"
          element={<StandoutPage />}
        />
        <Route
          path="contacto"
          element={<ContactPage />}
        />
        <Route
          path="caracteristicas"
          element={<CaracteristicasPage />}
        />
      </Route>
    </Route>
    <Route
      path="resumen"
      element={<ProfileSummary />}
    />
    <Route
      path="*"
      element={<Page404 />}
    />
  </Routes>
);
