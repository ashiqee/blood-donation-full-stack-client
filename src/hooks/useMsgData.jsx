import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import usePublicAxios from "./usePublicAxios";

const useMsgData = () => {
    const { loading } = useAuth();
    const axiosPublic = usePublicAxios();

    // get all donationReq

    const {
        data: msgData,
        isPending: isMsgDataLoading,
        refetch,
    } = useQuery({
        queryKey: ["msgData"],
        enabled: !loading,
        staleTime: 3000,
        refetchInterval: 5000,
        queryFn: async () => {
            const res = await axiosPublic.get(`/msg`);
            return res.data;
        },
    });

    return { msgData, isMsgDataLoading, refetch };
};

export default useMsgData;
