import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";

import Home from "./../Pages/Home/Home";
import SignUp from "../Pages/Auth/SignUp";
import SignIn from "../Pages/Auth/SignIn";
import DashboardLayOut from "./../Layout/DashboardLayOut";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DonationRequest from "../Pages/Dashboard/Donation/DonationRequest";
import Blog from "../Pages/Blog/Blog";
import SearchDonors from "../Pages/SearchDonors/SearchDonors";
import Profile from "./../Pages/Dashboard/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "donationRequest",
        element: <DonationRequest />,
      },
      {
        path: "searchDonors",
        element: <SearchDonors />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayOut />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
]);

export default router;
