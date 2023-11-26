import { useQuery } from '@tanstack/react-query';

import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useSingleUserData = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: userInfo, isPending: isUserLoading, refetch } = useQuery({
        queryKey: ['user'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user?.email}`)
            console.log(res.data);
            return res.data;
        }
    })

    return [userInfo, isUserLoading, refetch]
};

export default useSingleUserData;