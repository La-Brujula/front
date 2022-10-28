import { Route, Routes } from 'react-router-dom';
import { SearchBasePage } from './pages/base';

export default () => (
  <Routes>
    <Route path="" element={<SearchBasePage />}>
      <Route path="" element={<h1>Buscar</h1>} />
    </Route>
  </Routes>
);
