import { useQuery } from "@tanstack/react-query";

import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useStaticsReport = () => {

    const axiosSecure = useAxiosSecure();
    const { loading } = useAuth()

    // get all donationReq

    const {
        data: statictisData,
        isPending: isstatictisDataLoading,
        refetch: statictisDataRefetch,
    } = useQuery({
        queryKey: ["blogData"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/statictisData`);
            return res.data;
        },
    });






    return { statictisData, isstatictisDataLoading }
};

export default useStaticsReport;