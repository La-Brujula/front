import { Container } from "@shared/layout/container";
import { LoginForm } from "../../auth/components/loginForm";
import { PorCategorias } from "../../search/components/categorias";
import { PorFiltros } from "../../search/components/filtros";

export const LandingPage = () => {
  return (
    <>
      <Container bg="lightblue">
        <h2 className="mb-4">Iniciar Sesión</h2>
        <LoginForm color="lightblue" />
      </Container>
      <Container>
        <h2 className="mb-4">Busca en la bolsa de trabajo de La Brújula</h2>
        <PorFiltros />
      </Container>
      <Container bg="lightblue">
        <h2 className="mb-4">Busca por categoría</h2>
        <PorCategorias
          categorias={[
            "Preproducción",
            "Talento",
            "Equipo Humano",
            "Producción",
            "Producción",
            "Producción",
            "Producción",
            "Producción",
            "Producción",
          ]}
        />
      </Container>
    </>
  );
};
