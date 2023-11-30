import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useEffect } from "react";

const useDataForAdmin = (currentPage, pageLimit) => {
  const { loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // get all donationReq
  const pageLimitInt = parseInt(pageLimit)


  const {
    data: donationsReqs,
    isPending: isDonationLoading,
    refetch: allDonationRefetch,
  } = useQuery({
    queryKey: ["donations"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/donationReqs?page=${currentPage}&limit=${pageLimitInt}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return res.data;
    },
  });

  console.log(donationsReqs);

  useEffect(() => {
    allDonationRefetch()
  }, [currentPage, pageLimit, allDonationRefetch])



  return { donationsReqs, isDonationLoading, allDonationRefetch };
};

export default useDataForAdmin;
