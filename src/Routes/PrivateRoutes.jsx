import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
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

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoutes;
