import { Route, Routes } from 'react-router-dom';
import { SearchBasePage } from '../search/pages/base';
import { AreaPage } from './pages/area';
import { BasicInfo } from './pages/basicInfo';
import Signup from './pages/signup';

export default () => (
  <Routes>
    <Route index element={<Signup />} />
    <Route path="" element={<SearchBasePage />}>
      <Route path="basica" element={<BasicInfo />} />
      <Route path="area" element={<AreaPage />} />
    </Route>
  </Routes>
);
