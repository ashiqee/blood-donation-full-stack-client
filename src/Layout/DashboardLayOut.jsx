import { Outlet } from "react-router-dom";
import SideBar from "../Pages/Dashboard/Shared/SideBar";
import Footer from "../Components/Shared/Footer/Footer";
import useAuth from "../hooks/useAuth";

const DashboardLayOut = () => {

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

  return (
    <div>
      <div className="flex ">
        <SideBar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayOut;
