import {
    createBrowserRouter,

} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";

import Home from './../Pages/Home/Home';
import SignUp from "../Pages/Auth/SignUp";
import SignIn from "../Pages/Auth/SignIn";
import DashboardLayOut from './../Layout/DashboardLayOut';
import Dashboard from "../Pages/Dashboard/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/signUp',
                element: <SignUp />
            },
            {
                path: '/login',
                element: <SignIn />

            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayOut />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            }
        ]
    }
]);

export default router;