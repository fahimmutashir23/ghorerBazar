import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';
import useUser from '@/Security/useUser';

const useGetCart = () => {
    const axiosPublic = useAxiosPublic();
    const [userData] = useUser();

    const {data:products, isLoading:productLoading, refetch:productFetch} = useQuery({
        queryKey: ["get-cart"],
        queryFn: async () => {
            const res = await axiosPublic(`/api/get-cart/${userData._id}`);
            return res.data;
        }
    })

    return [products, productLoading, productFetch];
};

export default useGetCart;