import { Outlet } from "react-router-dom";
import NavBar from "../Components/Shared/NavBar/NavBar";

const MainLayout = () => {
    return (<>

        <NavBar />
        <Outlet />

    </>


    );
};

export default MainLayout;