import { Outlet } from 'react-router-dom';
import { Container } from '@shared/layout/container';

export const SearchBasePage = () => {
  return (
    <>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default SearchBasePage;
