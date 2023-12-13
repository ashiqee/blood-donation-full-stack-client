import axios from "axios";

const axiosSecure = axios.create({
  // baseURL: "https://b8a12-server-side-ashiqee.vercel.app",
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
