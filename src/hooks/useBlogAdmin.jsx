import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import usePublicAxios from "./usePublicAxios";

const useBlogAdmin = (currentPage, pageLimit) => {
  const { loading } = useAuth();
  const axiosPublic = usePublicAxios();

  // get all donationReq
  const pageLimitInt = parseInt(pageLimit)



  const {
    data: blogData,
    isPending: isBlogDataLoading,
    refetch,
  } = useQuery({
    queryKey: ["blogDataAdmin"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosPublic.get(`/blog?page=${currentPage}&limit=${pageLimitInt}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return res.data;
    },
  });

  return { blogData, isBlogDataLoading, refetch };
};

export default useBlogAdmin;
