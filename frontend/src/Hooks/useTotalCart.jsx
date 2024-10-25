import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useTotalCart = () => {
    const axiosPublic = useAxiosPublic();

    const {data:totalCart, isLoading:totalCartLoading, refetch:totalCartFetch} = useQuery({
        queryKey: ["get-total-cart"],
        queryFn: async () => {
            const res = await axiosPublic(`/api/get-total-cart`, {withCredentials: true});
            return res.data.totalProduct;
        }
    })

    return [totalCart, totalCartLoading, totalCartFetch];
};

export default useTotalCart;