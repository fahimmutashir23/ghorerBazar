import Card from "@/Components/Card";
import useGetProduct from "@/Hooks/useGetProduct";
import { useState } from "react";
// import { Paginator } from 'primereact/paginator';
import Loader2 from "@/Utils/Loader2";

const AllProduct = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);
  const [products, productLoading] = useGetProduct(page, rows);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setPage(event.page);
  };

  if(productLoading) return <Loader2 />

  return (
    <div>
      <h1 className="text-center text-3xl font-medium mt-6">All Product</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 my-3">
        {products.result.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </div>
      {/* <Paginator className="bg-gray-700 max-w-fit mx-auto mt-2 text-white" first={first} rows={rows} totalRecords={products.totalProducts} onPageChange={onPageChange} /> */}
    </div>
  );
};

export default AllProduct;
