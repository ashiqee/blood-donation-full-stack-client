import { Outlet } from "react-router-dom";
import NavBar from "../Components/Shared/NavBar/NavBar";
import Footer from "../Components/Shared/Footer/Footer";
import useAuth from "../hooks/useAuth";

const MainLayout = () => {
    const { loading } = useAuth()
    if (loading) {
        return <>
            <div className="h-screen container mx-auto flex justify-center items-center">
                <img
                    className=""
                    src="https://cdn.dribbble.com/users/251111/screenshots/2775428/dailyui-014.gif"
                    alt=""
                />
            </div>
        </>
    }
    return (<>

        <NavBar />
        <Outlet />
        <Footer />

    </>


    );
};

export default MainLayout;