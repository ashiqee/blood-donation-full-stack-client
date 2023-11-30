import LoadingCom from "../../../Components/Loading/LoadingCom";
import useSingleUserData from "./../../../hooks/useSingleUserData";

const DashBoardWelcome = () => {
  const [userInfo, isUserLoading, refetch] = useSingleUserData();

  if (isUserLoading) {
    return <LoadingCom />
  }


  return (
    <div className="grid min-w-[calc(100vw-290px)] mx-auto items-center place-items-center md:grid-cols-2   gap-5">
      <div>
        <h2 className="text-4xl py-10  font-bold text-[#B31312] p-5">
          Welcome! to Blood donation
        </h2>{" "}
      </div>
      <div className="p-10 md:flex flex-col-reverse items-center gap-15  justify-end">
        <div>
          <h2 className="text-2xl mb-0">{userInfo?.name}</h2>
          <h2 className="text-2xl mb-5">Role: {userInfo?.role}</h2>
        </div>
        <img
          className="w-36 h-36 rounded-3xl"
          src={userInfo?.profileImg}
          alt=""
        />
      </div>
    </div>
  );
};

export default DashBoardWelcome;
