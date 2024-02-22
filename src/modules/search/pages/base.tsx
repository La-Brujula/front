import { Container } from '@shared/layout/container';
import { Outlet } from 'react-router-dom';

export const SearchBasePage = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default SearchBasePage;
