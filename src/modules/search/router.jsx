import { Route, Routes } from 'react-router-dom';
import { SearchBasePage } from './pages/base';
import { SearchResultsPage } from './pages/results';
import SearchUserProfilePage from './pages/userProfile';

export default () => (
  <Routes>
    <Route path="" element={<SearchBasePage />}>
      <Route path="" element={<SearchResultsPage />} />
    </Route>
    <Route path=":userId" element={<SearchUserProfilePage />} />
  </Routes>
);
