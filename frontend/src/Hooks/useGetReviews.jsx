import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useGetReviews = (id=null) => {
    const axiosPublic = useAxiosPublic();

    const {data:reviews=[], isLoading, refetch:reviewFetch} = useQuery({
        queryKey: ['fetch-review'],
        queryFn: async () => {
            const res = await axiosPublic(`/api/get-product-reviews?id=${id}`)
            return res.data
        }
    })
    return [reviews, isLoading, reviewFetch]
};

export default useGetReviews;