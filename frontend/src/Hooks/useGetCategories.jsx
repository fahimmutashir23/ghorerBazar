import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useGetCategories = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: categories,
    isLoading: categoriesLoading,
    refetch: categoriesFetch,
  } = useQuery({
    queryKey: ["get-category"],
    queryFn: async () => {
      const res = await axiosPublic(`/api/get-category`);
      return res.data.result;
    },
  });

  return [categories, categoriesLoading, categoriesFetch];
};

export default useGetCategories;
