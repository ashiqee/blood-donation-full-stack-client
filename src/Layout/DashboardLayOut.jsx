import { Outlet } from "react-router-dom";
import SideBar from "../Pages/Dashboard/Shared/SideBar";
import Footer from "../Components/Shared/Footer/Footer";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const DashboardLayOut = () => {
  const [msg, setMsg] = useState(false)
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
      <div className="" >
        {msg ? <><Chat setMsg={setMsg} /></> : <><button onClick={() => setMsg(true)}
          className="fixed right-16 text-6xl bottom-16"><img className="w-24" src="https://cdn.pixabay.com/photo/2021/03/02/12/03/messenger-6062243_1280.png" alt="" /></button></>}
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayOut;
