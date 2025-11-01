import Header from "./header.jsx";
import Footer from "./footer.jsx";
import NavBar from "./navBar.jsx";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function Layout() {
    const isAuthorizedUser = useSelector((state) => state.authUser && Object.keys(state.authUser).length > 0);

    return <>
        <Header />
        {isAuthorizedUser && <NavBar/>}
        {!isAuthorizedUser && <Outlet/>}
        <Footer />
    </>
}

export default Layout;