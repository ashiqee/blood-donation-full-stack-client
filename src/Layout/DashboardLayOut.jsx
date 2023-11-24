import { Outlet } from "react-router-dom";
import SideBar from "../Pages/Dashboard/Shared/SideBar";
import Footer from "../Components/Shared/Footer/Footer";


const DashboardLayOut = () => {
    return (
        <div>
            <div className="flex gap-5">
                <SideBar />
                <Outlet />

            </div>
            <Footer />
        </div>

    );
};

export default DashboardLayOut;