import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useUser = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()



    const { data: users, isPending: isUserLoading, refetch } = useQuery({
        queryKey: ['users'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`)
            return res.data;
        }
    })

    return [users, isUserLoading, refetch]
};

export default useUser;