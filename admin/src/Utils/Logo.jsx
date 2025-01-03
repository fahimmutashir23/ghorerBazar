import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { url } from "../../connection";
import logo from "../assets/logo/logo.jpg"

const Logo = ({h, w}) => {
    const axiosPublic = useAxiosPublic();
     const imgUrl = `${url}/upload/logo/`

    const {data} = useQuery({
        queryKey: ['get-company-profile-for-logo'],
        queryFn: async () => {
            const res = await axiosPublic('/api/get-company-profile')
            return res.data.result.logo[0]
        }
    })


    return (
        <div>
            <img src={logo} className={`h-${h} w-${w}`} alt="" />
        </div>
    );
};

export default Logo;