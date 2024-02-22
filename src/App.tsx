import { Footer } from '@shared/navigation/footer';
import { Navbar } from '@shared/navigation/navbar';
import { Outlet } from 'react-router-dom';

import './i18n';

function App() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden w-full z-0">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
