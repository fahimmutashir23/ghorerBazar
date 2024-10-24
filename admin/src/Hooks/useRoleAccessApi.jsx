import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useRoleAccessApi = () => {
  const axiosSecure = useAxiosSecure();
  const [roleAccess, setRoleAccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure("/api/get-create-role");
      setRoleAccess(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  return [roleAccess, loading];
};

export default useRoleAccessApi;
