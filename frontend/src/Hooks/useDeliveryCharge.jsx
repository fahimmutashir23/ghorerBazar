import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useDeliveryCharge = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: delivery = [],
    isLoading: deliveryLoading,
    refetch: deliveryFetch,
  } = useQuery({
    queryKey: ["get-delivery-charge"],
    queryFn: async () => {
      const res = await axiosPublic(`/api/get-delivery-charge-list`);
      return res.data.result;
    },
  });
  return [delivery, deliveryLoading, deliveryFetch];
};

export default useDeliveryCharge;
