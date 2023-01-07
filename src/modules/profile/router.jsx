import { Route, Routes } from 'react-router-dom';
import { BaseProfilePage } from './pages/base';
import CurrentUserPage from './pages/currentUserPage';

export default () => (
  <Routes>
    <Route path="/" element={<BaseProfilePage />}>
      <Route index element={<CurrentUserPage />} />
    </Route>
  </Routes>
);
