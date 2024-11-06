import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../useAxiosSecure";


const useBulkSales = () => {
    const axiosSecure = useAxiosSecure();

    const {data: bulkSale} = useQuery({
        queryKey: ['get-bulk-sale-report'],
        queryFn: async () => {
            const res = await axiosSecure('/api/report/bulk-sales')
            return res.data.amount
        }
    })
    return [bulkSale]
};

export default useBulkSales;