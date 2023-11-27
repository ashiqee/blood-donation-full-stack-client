import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useDataForAdmin = () => {

    const { loading } = useAuth()
    const axiosSecure = useAxiosSecure()



    // get all donationReq 

    const { data: donationsReqs, isPending: isDonationLoading, refetch } = useQuery({
        queryKey: ['donations'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/donationReqs`)
            return res.data;
        }
    })


    return { donationsReqs, isDonationLoading, refetch }
};

export default useDataForAdmin;