import { Route, Routes } from 'react-router-dom';
import { AreaForms } from './components/areaForm';
import { AreaActivity } from './components/areaActivityForm';
import { lazy } from 'react';

const Signup = lazy(() => import('./pages/signup'));
const SearchBasePage = lazy(() => import('../search/pages/base'));
const BaseStepPage = lazy(() => import('./pages/base'));
const ProfileSummary = lazy(() => import('./pages/summary'));
const BasicInfo = lazy(() => import('./pages/basicInfo'));
const Privacy = lazy(() => import('./pages/privacy'));
const StandoutPage = lazy(() => import('./pages/standOut'));
const ContactPage = lazy(() => import('./pages/contact'));

export default () => (
  <Routes>
    <Route index element={<Signup />} />
    <Route path="" element={<SearchBasePage />}>
      <Route path="basica" element={<BasicInfo />} />
      <Route path="" element={<BaseStepPage />}>
        <Route path="area" element={<AreaForms />} />
        <Route path="area/:area" element={<AreaActivity />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="destaca" element={<StandoutPage />} />
        <Route path="contacto" element={<ContactPage />} />
        <Route path="características" element={<h1>Características</h1>} />
      </Route>
    </Route>
    <Route path="resumen" element={<ProfileSummary />} />
    <Route
      path="*"
      element={
        <h1 className="leading-[25vh] text-center">
          uwu
          <br /> <span className="text-xl">no ta</span>
        </h1>
      }
    />
  </Routes>
);
