import { Route, Routes } from 'react-router-dom';
import { SearchBasePage } from './pages/base';
import { SearchResultsPage } from './pages/results';
import SubCategoryPage from './pages/subcategory';
import SearchByCategory from './pages/searchByCategory';

export default () => (
  <Routes>
    <Route path="category" element={<SearchByCategory />} />
    <Route path="" element={<SearchBasePage />}>
      <Route path="" element={<SearchResultsPage />} />
      <Route path=":category" element={<SubCategoryPage />} />
    </Route>
  </Routes>
);
