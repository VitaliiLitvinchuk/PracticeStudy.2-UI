import { Outlet, useLocation } from "react-router";
import Header from "../Header/index";
import Footer from "../Footer/index";

const Layout = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const banned = ['/login', '/register'];

    return (
        <>
            <header>
                <Header />
            </header>
            <main style={{ flex: 1 }}>
                <Outlet />
            </main>
            {
                !banned.includes(currentPath) &&
                <footer>
                    <Footer />
                </footer>
            }
        </>
    );
}

export default Layout;