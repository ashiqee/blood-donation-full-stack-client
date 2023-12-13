import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: "https://b8a12-server-side-ashiqee.vercel.app",
  baseURL: "http://localhost:5000",
});
const usePublicAxios = () => {
  return axiosPublic;
};

export default usePublicAxios;
