import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useGetProduct = (page, rows) => {
    const axiosPublic = useAxiosPublic();

    const {data:products, isLoading:productLoading, refetch:productFetch} = useQuery({
        queryKey: ["get-web-product"],
        queryFn: async () => {
            const res = await axiosPublic(`/api/get-all-products`);
            return res.data;
        }
    })

    return [products, productLoading, productFetch];
};

export default useGetProduct;