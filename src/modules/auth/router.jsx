import { Route, Routes } from 'react-router-dom';
import { SearchBasePage } from '../search/pages/base';
import { AreaForms } from './components/areaForm';
import { AreaActivity } from './components/areaActivityForm';
import { BaseStepPage } from './pages/base';
import { BasicInfo } from './pages/basicInfo';
import Signup from './pages/signup';

export default () => (
  <Routes>
    <Route index element={<Signup />} />
    <Route path="" element={<SearchBasePage />}>
      <Route path="basica" element={<BasicInfo />} />
      <Route path="" element={<BaseStepPage />}>
        <Route path="area" element={<AreaForms />} />
        <Route path="area/:area" element={<AreaActivity />} />
      </Route>
    </Route>
  </Routes>
);
