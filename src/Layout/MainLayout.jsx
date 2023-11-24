import { Outlet } from "react-router-dom";
import NavBar from "../Components/Shared/NavBar/NavBar";
import Footer from "../Components/Shared/Footer/Footer";

const MainLayout = () => {
    return (<>

        <NavBar />
        <Outlet />
        <Footer />

    </>


    );
};

export default MainLayout;