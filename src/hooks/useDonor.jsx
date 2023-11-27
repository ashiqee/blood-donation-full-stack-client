import React, { useEffect, useState } from "react";
import useSingleUserData from "./useSingleUserData";

const useDonor = () => {
  const [userInfo, isUserLoading, refetch] = useSingleUserData();
  const [isDonor, setIsDonor] = useState(false);

  useEffect(() => {
    if (userInfo?.role === "Donor") {
      setIsDonor(true);
    }
  }, [userInfo]);

  return [isDonor];
};

export default useDonor;
