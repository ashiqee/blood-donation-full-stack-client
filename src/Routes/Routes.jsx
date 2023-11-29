import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";

import Home from "./../Pages/Home/Home";
import SignUp from "../Pages/Auth/SignUp";
import SignIn from "../Pages/Auth/SignIn";
import DashboardLayOut from "./../Layout/DashboardLayOut";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DonationRequest from "../Pages/Dashboard/Donation/DonationReq/DonationRequest";
import Blog from "../Pages/Blog/Blog";
import SearchDonors from "../Pages/SearchDonors/SearchDonors";
import Profile from "./../Pages/Dashboard/Profile/Profile";
import AllUsers from "../Pages/Dashboard/AdminHome/AllUsers";
import AllDonationReq from "../Pages/Dashboard/AdminHome/AllBloodDonationReq/AllDonationReq";
import ContentManage from "../Pages/Dashboard/AdminHome/ContentManage/ContentManage";
import MyDonationRequests from "../Pages/Dashboard/Donor/MyDonationRequests";
import CreateDonation from "../Pages/Dashboard/Donor/CreateDonation";

import DonationDetails from "../Pages/Dashboard/Donation/DonationDetails";
import AddNewBlog from "./../Pages/Dashboard/AdminHome/ContentManage/AddNewBlog";


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
        path: "donationDetails/:id",
        element: <DonationDetails />,
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
      {
        path: "/dashboard/all-users",
        element: <AllUsers />,
      },
      {
        path: "/dashboard/all-donation-request",
        element: <AllDonationReq />,
      },
      {
        path: "/dashboard/content-management",
        element: <ContentManage />,
      },
      {
        path: "/dashboard/my-donation-request",
        element: <MyDonationRequests />,
      },
      {
        path: "/dashboard/create-donation-request",
        element: <CreateDonation />,
      },
      {
        path: "/dashboard/addBlog",
        element: <AddNewBlog />,
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
