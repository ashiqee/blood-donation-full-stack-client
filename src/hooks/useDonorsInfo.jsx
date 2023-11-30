import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "./usePublicAxios";
import { useEffect } from "react";


const useDonorsInfo = async (search) => {
    const axiosPublic = usePublicAxios()
    // console.log(search);


    const query = new URLSearchParams(search).toString();
    // console.log(query);
    //get districts data
    const { data: donorData, isLoading: donorDataLoading, refetch: donorRefetch } = useQuery({
        queryKey: ['donorData'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/userDonor?${query}`, search)
            // console.log(res.data);
            return res.data
        }
    })

    useEffect(() => {
        donorRefetch()
    }, [search, donorRefetch])
    // console.log(donorData);
    return donorData;
};

export default useDonorsInfo;