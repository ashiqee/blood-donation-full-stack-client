import { useEffect, useState } from "react";
import useSingleUserData from "./useSingleUserData";

const useVolunteer = () => {
  const [userInfo, isVolunteerLoading, refetch] = useSingleUserData();
  const [isVolunteer, setIsVolunteer] = useState(false);

  useEffect(() => {
    if (userInfo?.role === "Volunteer") {
      setIsVolunteer(true);
    }
  }, [userInfo]);

  return [isVolunteer, isVolunteerLoading];
};

export default useVolunteer;
