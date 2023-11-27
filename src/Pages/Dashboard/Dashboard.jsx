import useDonor from "../../hooks/useDonor";
import useSingleUserData from "../../hooks/useSingleUserData";
import DashBoardWelcome from "./DashboardWelcome/DashBoardWelcome";
import DonorHome from "./Donor/DonorHome";

const Dashboard = () => {
  const [userInfo, isUserLoading, refetch] = useSingleUserData();
  const [isDonor] = useDonor();
  return (
    <div>
      <DashBoardWelcome />
      {isDonor && <DonorHome />}
    </div>
  );
};

export default Dashboard;
