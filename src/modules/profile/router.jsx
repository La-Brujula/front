import { Route, Routes } from 'react-router-dom';
import { BaseProfilePage } from './pages/base';
import { LandingPage } from './pages/landing';

export default () => (
  <Routes>
    <Route path="/" element={<BaseProfilePage />}>
      <Route index element={<LandingPage />} />
      <Route path="resumen" element={<h1>Resumen</h1>} />
      <Route path="contacto" element={<h1>Contacto</h1>} />
      <Route path="revisar" element={<h1>Revisar</h1>} />
      <Route path="completar" element={<h1>Completar</h1>} />
      <Route path="editar" element={<h1>Editar</h1>} />
      <Route
        path="caracteristicas-personales"
        element={<h1>Caracteristicas Personales</h1>}
      />
      <Route
        path="caracteristicas-personales"
        element={<h1>Caracteristicas Personales</h1>}
      />
    </Route>
  </Routes>
);
