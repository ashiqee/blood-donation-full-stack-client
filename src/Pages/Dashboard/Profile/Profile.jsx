import { Edit } from "@mui/icons-material";
import { TabsWithIcon } from "../../../Components/UserProfileTab/UserProfileTab";
import ProfileModal from "./ProfileEdit/ProfileModal";

const Profile = () => {
  const profileImg = "https://miocoral.com/wp-content/uploads/2019/10/big.jpg";
  const coverImg =
    "https://img.freepik.com/free-photo/skillful-nurse-is-doing-blood-test-man-clinic-man-medical-mask_1157-48827.jpg?w=1380&t=st=1700969990~exp=1700970590~hmac=7b0618667932684f390f164cadf2e7bc76f47e654536c6698632f5b9f5c38a69";
  return (
    <div className="transition-all min-h-screen pl-0">
      {/* profile cover */}

      <div className="   min-w-[calc(100vw-290px)]   ">
        <div className="relative  w-full overflow-hidden">
          <img className="w-full object-cover h-96 " src={coverImg} alt="" />
        </div>
        <br />
      </div>
      <div className="md:flex  md:justify-end">
        <div className="absolute bottom-0 top-96  left-72">
          <div className="lg:flex gap-5 items-center">
            <img
              className="md:w-48 w-36 rounded-full"
              src={profileImg}
              alt=""
            />
            <div className="">
              <h2 className="text-2xl">Name:</h2>
              <p>email: </p>
            </div>
          </div>
        </div>

        <div className="md:flex flex-wrap md:relative mr-10   mt-14">
          <ProfileModal text={"Edit Profile"} />
        </div>
      </div>
      <div className="relative container mx-auto h-[400px] mt-20 mb-28 -bottom-20 md:w-2/3">
        <TabsWithIcon />
      </div>
    </div>
  );
};

export default Profile;
