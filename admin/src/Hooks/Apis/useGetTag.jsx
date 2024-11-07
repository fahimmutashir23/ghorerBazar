import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";

const useGetTag = (page, rows) => {
  const axiosSecure = useAxiosSecure();
  const {
    data: tag = [],
    isLoading: tagLoading,
    refetch: tagFetch,
  } = useQuery({
    queryKey: ["get-all-tag"],
    queryFn: async () => {
      const res = await axiosSecure(
        `/api/get-tag-list?page=${page}&limit=${rows}`
      );
      return res.data;
    },
  });

  return [tag, tagLoading, tagFetch];
};

export default useGetTag;
