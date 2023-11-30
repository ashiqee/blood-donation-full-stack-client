import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useDataForAdmin = () => {
  const { loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // get all donationReq

  const {
    data: donationsReqs,
    isPending: isDonationLoading,
    refetch: allDonationRefetch,
  } = useQuery({
    queryKey: ["donations"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/donationReqs`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return res.data;
    },
  });

  return { donationsReqs, isDonationLoading, allDonationRefetch };
};

export default useDataForAdmin;
