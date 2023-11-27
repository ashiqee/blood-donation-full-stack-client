import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:5000",
});
const usePublicAxios = () => {
  return axiosPublic;
};

export default usePublicAxios;
