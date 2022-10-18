import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../auth/pages/login";
import { SignupPage } from "../auth/pages/signup";
import { LandingPage } from "../landing/pages/landing";

export const SearchRouter = createBrowserRouter([
    {
        path: "/",
        children: [
            { path: "", element: <LandingPage /> },
            { path: "iniciar-sesion", element: <LoginPage /> },
            { path: "crear-usuario", element: <SignupPage /> },
            { path: "perfil", element: <h2>Perfil</h2> },
            { path: "buscar", element: <h2>Buscar</h2> },
            { path: "guias", element: <h2>Guias</h2> },
            { path: "nosotros", element: <h2>Nosostros</h2> },
            { path: "contacto", element: <h2>Contacto</h2> },
            { path: "cerrar-sesion", element: <h2>Cerrar sesión</h2> },
        ],
    },
    { path: "*", element: <h1>404</h1> },
]);
