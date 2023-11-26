import { Edit } from "@mui/icons-material";
import { TabsWithIcon } from "../../../Components/UserProfileTab/UserProfileTab";
import ProfileModal from "./ProfileEdit/ProfileModal";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useSingleUserData from "../../../hooks/useSingleUserData";

const Profile = () => {

  const { user, loading } = useAuth()

  const [userInfo, isUserLoading, refetch] = useSingleUserData()













  const profileImg = user?.photoURL;

  return (
    <div className="transition-all min-h-screen pl-0">
      {/* profile cover */}

      <div className="   min-w-[calc(100vw-290px)]   ">
        <div className="relative  w-full overflow-hidden">
          <img className="w-full object-cover h-96 " src={userInfo?.coverImg} alt="" />
        </div>
        <br />
      </div>
      <div className="md:flex  md:justify-end">
        <div className="absolute bottom-0 top-96  left-72">
          <div className="lg:flex gap-5 items-center">
            <img
              className="md:w-48 w-36 h-36 md:h-48 rounded-full"
              src={profileImg}
              alt=""
            />
            <div className="">
              <h2 className="text-2xl">Name: {user?.displayName} </h2>
              <p>email: {user?.email}</p>
            </div>
          </div>
        </div>

        <div className="md:flex flex-wrap md:relative mr-10   mt-14">
          <ProfileModal userData={userInfo} isUserLoading={isUserLoading} refetch={refetch} />
        </div>
      </div>
      <div className="relative container mx-auto h-[400px] mt-20 mb-28 -bottom-20 md:w-2/3">
        <TabsWithIcon blood={userInfo?.blood} districts={userInfo?.districts} upuzilla={userInfo?.upuzilla} />
      </div>
    </div>
  );
};

export default Profile;
