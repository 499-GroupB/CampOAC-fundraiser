// Layout page
// controls the general look of every page on the site
// useful for authentication (use tokens)

import Navbar from '../components/Nav.js';
import Footer from '../components/Footer.js';
import { Outlet } from "react-router-dom";

const Layout = () => {

    return (
        <>
        <div className="wrapper">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
        </>
    )
};

export default Layout;