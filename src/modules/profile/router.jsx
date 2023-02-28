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
    <Route
      path='*'
      element={
        <h1 className="leading-[25vh] text-center">
          uwu
          <br /> <span className="text-xl">no ta</span>
        </h1>}
    >
    </Route>
  </Routes >
);
