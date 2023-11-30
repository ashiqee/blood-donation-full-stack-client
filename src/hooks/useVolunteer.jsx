import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useVolunteer = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isVolunteer, isPending: isVolunteerLoading } = useQuery({
    queryKey: [user?.email, "isVolunteer"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/volunteer/${user?.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      return res.data?.volunteer;
    },
  });

  return [isVolunteer, isVolunteerLoading];
};

export default useVolunteer;
