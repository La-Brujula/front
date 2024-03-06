import { Route, Routes } from 'react-router-dom';
import { BaseProfilePage } from './pages/base';
import CurrentUserPage from './pages/currentUserPage';
import UserProfilePage from './pages/userProfile';
import Page404 from '@/shared/navigation/page404';
export default () => (
  <Routes>
    <Route
      path="/"
      element={<BaseProfilePage />}
    >
      <Route
        index
        element={<CurrentUserPage />}
      />
      <Route
        path=":userId"
        element={<UserProfilePage />}
      />
    </Route>
    <Route
      path="*"
      element={<Page404 />}
    ></Route>
  </Routes>
);
