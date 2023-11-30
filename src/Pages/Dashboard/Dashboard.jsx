import useAdmin from "../../hooks/useAdmin";
import useDonor from "../../hooks/useDonor";

import DashBoardWelcome from "./DashboardWelcome/DashBoardWelcome";
import DonorHome from "./Donor/DonorHome";
import AdminHome from "./AdminHome/AdminHome";
import useVolunteer from "../../hooks/useVolunteer";
import LoadingCom from "../../Components/Loading/LoadingCom";

const Dashboard = () => {

  const [isDonor] = useDonor();
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isVolunteer, isVolunteerLoading] = useVolunteer()

  if (isAdminLoading || isVolunteerLoading) {
    return <LoadingCom />;
  }
  return (
    <div>
      <DashBoardWelcome />
      {(isAdmin || isVolunteer) && <AdminHome />}
      {isDonor && <DonorHome />}
    </div>
  );
};

export default Dashboard;
