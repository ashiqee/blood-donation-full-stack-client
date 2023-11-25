import { useEffect, useState } from "react";
import usePublicAxios from "./usePublicAxios";
import { useQuery } from "@tanstack/react-query";



const useDistricts = () => {
    const [districtId, setDistrictid] = useState(1)


    const axiosPublic = usePublicAxios()








    //get districts data
    const { data: districts = [] } = useQuery({
        queryKey: ['districs'],
        queryFn: async () => {
            const res = await axiosPublic.get('/districts')

            return res.data
        }
    })
    //get upuzilla data
    const { data: upuzzila = [], refetch } = useQuery({
        queryKey: ['upuzzila'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/upuzilas/${districtId}`)
            // console.log(res.data);
            return res.data
        }
    })




    // console.log(upuzzila);
    // get district id 
    const handleDistricts = (e, value) => {



        setDistrictid(value.districtId)
        refetch()
    }

    useEffect(() => {

        refetch()

        // fetch('districts.json')
        //     .then(res => res.json())
        //     .then(data => {

        //         setDistrict(data)
        //     })
    }, [districtId, refetch])

    // useEffect(() => {
    //     const getUpuzilla = async () => {
    //         const resUpuzilla = await fetch()
    //     }
    // }, [])



    return [districts, handleDistricts, upuzzila, refetch]
};

export default useDistricts;