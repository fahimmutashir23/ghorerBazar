import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useMonthlySale = () => {
    const axiosSecure = useAxiosSecure();

    const {data: monthlySale} = useQuery({
        queryKey: ['get-monthly-sale-report'],
        queryFn: async () => {
            const res = await axiosSecure('/api/report/monthly-sales')
            return res.data.report
        }
    })
    return [monthlySale]
};

export default useMonthlySale;