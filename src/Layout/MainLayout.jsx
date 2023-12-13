import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../Components/Shared/NavBar/NavBar";
import Footer from "../Components/Shared/Footer/Footer";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { MessageRounded } from "@mui/icons-material";
import Chat from "../Components/Chat/Chat";
import Login from "../Pages/Auth/SignIn";

const MainLayout = () => {
    const [msg, setMsg] = useState(false)
    const { loading, user } = useAuth()
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
        <div className="" >
            {msg ? <>

                {user ? <><Chat setMsg={setMsg} /></> : <>
                    <Navigate to='/login'></Navigate>

                </>}
            </> : <><button onClick={() => setMsg(true)}
                className="fixed right-16 text-6xl bottom-16"><img className="w-24" src="https://cdn.pixabay.com/photo/2021/03/02/12/03/messenger-6062243_1280.png" alt="" /></button></>}
        </div>
        <Footer />


    </>


    );
};

export default MainLayout;