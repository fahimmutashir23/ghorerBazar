import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const useUser = () => {
    const axiosSecure = useAxiosSecure();
    const token = localStorage.getItem('token')
 
  
    const {data:userData = null, isLoading, refetch} = useQuery({
      queryKey : ['profile_info'],
      queryFn : async () => {
        const res = await axiosSecure("/api/profile");
        return res.data.result
      },
      enabled: !!token
    })
    
    return [userData, isLoading, refetch]
    
};

export default useUser;