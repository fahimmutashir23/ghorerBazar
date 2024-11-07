import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";

const useGetProductCat = (page, rows) => {
  const axiosSecure = useAxiosSecure();
  const {
    data: productCat = [],
    isLoading: productCatLoading,
    refetch: productCatFetch,
  } = useQuery({
    queryKey: ["get-product-cat"],
    queryFn: async () => {
      const res = await axiosSecure(
        `/api/get-category-list?page=${page}&limit=${rows}`
      );
      return res.data;
    },
  });
  return [productCat, productCatLoading, productCatFetch];
};

export default useGetProductCat;
