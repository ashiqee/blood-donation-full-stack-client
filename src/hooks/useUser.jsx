import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useEffect } from "react";


const useUser = (currentPage, pageLimit) => {
    const { loading } = useAuth()
    const axiosSecure = useAxiosSecure()

    const pageLimitInt = parseInt(pageLimit)


    const { data: users, isPending: isUserLoading, refetch } = useQuery({
        queryKey: ['users'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?page=${currentPage}&limit=${pageLimitInt}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            return res.data;
        }
    })

    useEffect(() => {
        refetch()
    }, [currentPage, pageLimit, refetch])

    return [users, isUserLoading, refetch]
};

export default useUser;