import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";

const useGetBrand = () => {
    const axiosSecure = useAxiosSecure()
    const { data: brand = [] , isLoading: brandLoading } = useQuery({
        queryKey: ["get-brand-for-stock"],
        queryFn: async () => {
          const res = await axiosSecure("/api/get-brand-list");
          return res.data.result;
        },
      });
    return [brand, brandLoading]
};

export default useGetBrand;