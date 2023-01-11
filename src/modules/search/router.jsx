import { Route, Routes } from 'react-router-dom';
import { SearchBasePage } from './pages/base';
import { SearchResultsPage } from './pages/results';

export default () => (
  <Routes>
    <Route path="" element={<SearchBasePage />}>
      <Route path="" element={<SearchResultsPage />} />
    </Route>
  </Routes>
);
