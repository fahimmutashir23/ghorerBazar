import { useNavigate } from "react-router-dom";
import useUser from "./useUser";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const CheckActive = ({children}) => {
    const [userData] = useUser();
    const navigate = useNavigate();
    const [go, setGo] = useState(false);

    useEffect(() => {
        if(userData.active === false){
            return toast.error('you are not active') && navigate('/login')
        } else {
            return setGo(true)
        }
    }, [])
    return go && children
};

export default CheckActive;