import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import usePublicAxios from "./usePublicAxios";

const useBlogData = () => {
  const { loading } = useAuth();
  const axiosPublic = usePublicAxios();

  // get all donationReq

  const {
    data: blogData,
    isPending: isBlogDataLoading,
    refetch,
  } = useQuery({
    queryKey: ["blogData"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosPublic.get(`/blog`);
      return res.data;
    },
  });

  return { blogData, isBlogDataLoading, refetch };
};

export default useBlogData;
