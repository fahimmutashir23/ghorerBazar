import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const useUser = () => {
    const axiosSecure = useAxiosSecure();
    const token = localStorage.getItem('token')
  
    const {data:userData = null, isLoading, refetch} = useQuery({
      queryKey : ['get_profile_data'],
      queryFn : async () => {
        try {
          const res = await axiosSecure("/api/profile");
          return res.data.result
        } catch (error) {
          
        }
      },
      enabled: !!token
    })

    
    return [userData, isLoading, refetch]
    
};

export default useUser;