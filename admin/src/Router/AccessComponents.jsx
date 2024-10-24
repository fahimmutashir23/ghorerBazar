import { toast } from "react-toastify";
import useUser from "../Security/useUser";
import Loader2 from "../Utils/Loader2";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const AccessComponents = ({accessName, children}) => {
    const token = localStorage.getItem('token');
    const [userData, isLoading] = useUser();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!isLoading) {
        if (!token) {
          toast.error('You are not logged in');
          navigate('/admin/login');
        } else {
          const access = userData.userPermissionData?.some((item) => item === accessName);
          if (!access) {
            toast.error('You are not permission to go this route');
            navigate(-1);
          }
        }
      }
    }, [isLoading, token, userData, navigate, accessName]);
  
    if (isLoading) {
      return <Loader2 />;
    }
  
    return children;
}

export default AccessComponents;