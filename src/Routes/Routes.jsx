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
import PrivateRoutes from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";
import VolunteerRoutes from "./volunteerRoutes";

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
      //donor public
      {
        path: "donationRequest",
        element: <DonationRequest />,
      },
      {
        path: "donationDetails/:id",
        element: (
          <PrivateRoutes>
            <DonationDetails />
          </PrivateRoutes>
        ),
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
    element: (
      <PrivateRoutes>
        <DashboardLayOut />
      </PrivateRoutes>
    ),
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
        element: (
          <AdminRoutes>
            <AllUsers />
          </AdminRoutes>
        ),
      },
      {
        path: "/dashboard/all-donation-request",
        element: (
          <AdminRoutes>
            <VolunteerRoutes>
              <AllDonationReq />
            </VolunteerRoutes>
          </AdminRoutes>
        ),
      },
      {
        path: "/dashboard/content-management",
        element: (
          <AdminRoutes>
            <VolunteerRoutes>
              <ContentManage />
            </VolunteerRoutes>
          </AdminRoutes>
        ),
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
        element: (
          <AdminRoutes>
            <AddNewBlog />
          </AdminRoutes>
        ),
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
