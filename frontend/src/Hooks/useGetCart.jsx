import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useGetCart = () => {
    const axiosPublic = useAxiosPublic();

    const {data:cart, isLoading:cartLoading, refetch:cartFetch} = useQuery({
        queryKey: ["get-cart"],
        queryFn: async () => {
            const res = await axiosPublic(`/api/get-cart`, {withCredentials: true});
            return res.data;
        }
    })

    return [cart, cartLoading, cartFetch];
};

export default useGetCart;