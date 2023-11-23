import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'districts.json',
})
const usePublicAxios = () => {

    return axiosPublic;
};

export default usePublicAxios;