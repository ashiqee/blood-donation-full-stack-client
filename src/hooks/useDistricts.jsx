import { useEffect, useState } from "react";
import usePublicAxios from "./usePublicAxios";


const useDistricts = () => {
    const [districts, setDistrict] = useState([])
    // const axiosPublic = usePublicAxios()

    // axiosPublic.get()

    useEffect(() => {

        fetch('districts.json')
            .then(res => res.json())
            .then(data => {

                setDistrict(data)
            })
    }, [])



    return [districts]
};

export default useDistricts;