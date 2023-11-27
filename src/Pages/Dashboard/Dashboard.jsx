import useAdmin from "../../hooks/useAdmin";
import useDonor from "../../hooks/useDonor";
import useSingleUserData from "../../hooks/useSingleUserData";
import DashBoardWelcome from "./DashboardWelcome/DashBoardWelcome";
import DonorHome from "./Donor/DonorHome";
import AdminHome from "./AdminHome/AdminHome";

const Dashboard = () => {
  const [userInfo, isUserLoading, refetch] = useSingleUserData();
  const [isDonor] = useDonor();
  const [isAdmin, isAdminLoading] = useAdmin();

  if (isAdminLoading) {
    return <>Loading..... </>;
  }
  return (
    <div>
      <DashBoardWelcome />
      {isAdmin && <AdminHome />}
      {isDonor && <DonorHome />}
    </div>
  );
};

export default Dashboard;
