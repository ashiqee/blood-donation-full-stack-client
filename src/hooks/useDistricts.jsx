import { useEffect, useState } from "react";
import usePublicAxios from "./usePublicAxios";
import { useQuery } from "@tanstack/react-query";


const useDistricts = () => {
    const [districtId, setDistrictid] = useState('')
    const axiosPublic = usePublicAxios()


    //get districts data
    const { data: districts = [] } = useQuery({
        queryKey: ['districs'],
        queryFn: async () => {
            const res = await axiosPublic.get('/districts')
            // console.log(res.data);
            return res.data
        }
    })
    //get upuzilla data
    const { data: upuzzila = [], refetch } = useQuery({
        queryKey: ['upuzzila'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/upuzila/${districtId}`)
            // console.log(res.data);
            return res.data
        }
    })




    // console.log(upuzzila);
    // get district id 
    const handleDistricts = (e) => {

        const eInt = parseInt(e)

        setDistrictid(eInt)
    }

    useEffect(() => {

        refetch()

        // fetch('districts.json')
        //     .then(res => res.json())
        //     .then(data => {

        //         setDistrict(data)
        //     })
    }, [districtId])

    // useEffect(() => {
    //     const getUpuzilla = async () => {
    //         const resUpuzilla = await fetch()
    //     }
    // }, [])



    return [districts, handleDistricts, upuzzila, refetch]
};

export default useDistricts;