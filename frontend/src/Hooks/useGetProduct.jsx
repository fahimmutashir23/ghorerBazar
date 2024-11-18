import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { BasicContext } from "@/ContextAPIs/BasicProvider";


const useGetProduct = (page, rows) => {
    const axiosPublic = useAxiosPublic();
    const {value} = useContext(BasicContext);

    const {data:products, isLoading:productLoading, refetch:productFetch} = useQuery({
        queryKey: ["get-web-product"],
        queryFn: async () => {
            const res = await axiosPublic(`/api/get-all-products?search=${value}`, {withCredentials: true});
            return res.data;
        }
    })

    return [products, productLoading, productFetch];
};

export default useGetProduct;