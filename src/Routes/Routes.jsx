import {
    createBrowserRouter,

} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";

import Home from './../Pages/Home/Home';
import SignUp from "../Pages/Auth/SignUp";
import SignIn from "../Pages/Auth/SignIn";

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
]);

export default router;