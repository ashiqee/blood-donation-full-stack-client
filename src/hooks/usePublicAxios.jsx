import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://b8a12-server-side-ashiqee.vercel.app",
});
const usePublicAxios = () => {
  return axiosPublic;
};

export default usePublicAxios;
