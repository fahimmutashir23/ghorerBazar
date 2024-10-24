import axios from "axios";
import { url } from "../../connection";


const axiosInstance = axios.create({
  baseURL: url
})

const useAxiosPublic = () => {
  return axiosInstance;
}

export default useAxiosPublic;