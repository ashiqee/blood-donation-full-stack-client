import { useQuery } from "@tanstack/react-query";

import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useStaticsReport = () => {

    const axiosSecure = useAxiosSecure();
    const { loading } = useAuth()

    // get all donationReq

    const {
        data: totalFundAmount,
        isPending: isFundAmountLoading,
        refetch: fundRefetch,
    } = useQuery({
        queryKey: ["blogData"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/totalFund`);
            return res.data;
        },
    });






    return { totalFundAmount }
};

export default useStaticsReport;