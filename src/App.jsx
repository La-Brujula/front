import { Navbar } from "@shared/navigation/navbar";
import { Outlet } from "react-router-dom";
import { Footer } from "@shared/navigation/footer";

import "./i18n";

function App() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}

export default App;
