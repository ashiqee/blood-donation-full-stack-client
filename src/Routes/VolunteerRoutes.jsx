import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

import useAuth from "../hooks/useAuth";
import useVolunteer from "../hooks/useVolunteer";

const VolunteerRoutes = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

  const [isVolunteer, isVolunteerLoading] = useVolunteer();

  if (loading || isVolunteerLoading || isAdminLoading) {
    return (
      <>
        <div className="h-screen container mx-auto flex justify-center items-center">
          <img
            className=""
            src="https://cdn.dribbble.com/users/251111/screenshots/2775428/dailyui-014.gif"
            alt=""
          />
        </div>
      </>
    );
  }

  if (user && (isVolunteer || isAdmin)) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default VolunteerRoutes;
