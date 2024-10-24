import useAxiosSecure from "./useAxiosSecure";
import { useEffect, useState } from "react";

const useGetCollectionLength = () => {
  const axiosSecure = useAxiosSecure();
  const [collectionData, setCollectionData] = useState({});
  const [collectionLoading, setCollectionLoading] = useState(false);


  const collectionFetch = async () => {
    setCollectionLoading(true)
    const info = {
      date: null,
      from: null,
      to: null,
      lastMonth: false,
      lastWeek: false,
    };
    const res = await axiosSecure.post("/api/get-all-collection-length", info);
    if(res.data.success){
      setCollectionData(res.data.result)
      setCollectionLoading(false)
    }
  };

  useEffect(() => {
    collectionFetch()
  }, []);

  return [collectionData, collectionLoading, collectionFetch];
};

export default useGetCollectionLength;
