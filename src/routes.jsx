import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { LoginPage } from "./modules/auth/pages/login.jsx";
import { SignupPage } from "./modules/auth/pages/signup.jsx";
import { LandingPage } from "./modules/landing/pages/landing";

export const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
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
            {
                path: "reiniciar-contraseña",
                element: <h2>Reiniciar Contraseña</h2>,
            },
        ],
    },
    { path: "*", element: <h1>404</h1> },
]);
