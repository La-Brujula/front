import { Route, Routes } from 'react-router-dom';
import { BaseProfilePage } from './pages/base';
import CurrentUserPage from './pages/currentUserPage';
import UserProfilePage from './pages/userProfile';

export default () => (
  <Routes>
    <Route path="/" element={<BaseProfilePage />}>
      <Route index element={<CurrentUserPage />} />
      <Route path=":userId" element={<UserProfilePage />} />
    </Route>
  </Routes>
);
