import { useEffect, useState } from "react";
import RelatedCard from "./RelatedCard";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

const RelatedProduct = ({ id, setFetchProduct }) => {
  const axiosPublic = useAxiosPublic();
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosPublic(`/api/get-products/${id}`);
      setProducts(res.data.result);
    };
    fetchData();
  }, [id]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 max-w-7xl mx-auto">
      {products?.map((product, idx) => (
        <RelatedCard key={idx} data={product} setFetchProduct={setFetchProduct} />
      ))}
    </div>
  );
};

export default RelatedProduct;
